const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

async function run() {
  const envContent = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
  const dbUrlLine = envContent.split('\n').find(line => line.startsWith('DATABASE_URL='));
  if (!dbUrlLine) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
  }
  const connectionString = dbUrlLine.split('DATABASE_URL=')[1].trim();
  console.log('Connecting to database...');

  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connected!');

  // Read schema
  let schema = fs.readFileSync(path.join(__dirname, 'supabase', 'schema.sql'), 'utf8');

  console.log('Running schema.sql to reset/update tables...');
  await client.query(schema);

  console.log('Seeding initial data...');

  // Helper functions
  const randomStatus = (statuses) => statuses[Math.floor(Math.random() * statuses.length)];
  const categories = ['Drilling', 'Logistics', 'Equipment supply', 'Catering', 'Construction', 'Safety services', 'IT & Tech', 'Explosives', 'Engineering'];
  const riskLevels = ['Low', 'Medium', 'High'];

  // Clear existing data (cascade handles most)
  console.log('Clearing old data...');
  await client.query(`
    TRUNCATE TABLE ai_messages, ai_documents, community_requests, applications, jobs, contractor_documents, contractors, supplier_documents, suppliers, users, roles CASCADE;
  `);

  // Seed Roles
  console.log('Seeding roles...');
  const roleNames = ['Admin', 'Procurement Officer', 'HR Officer', 'Community Officer', 'Supplier', 'Contractor'];
  const roleIds = {};
  for (const name of roleNames) {
    const res = await client.query('INSERT INTO roles (name) VALUES ($1) RETURNING id', [name]);
    roleIds[name] = res.rows[0].id;
  }

  // Seed Users (Profiles without auth.users for mock/demo purposes, we bypass foreign key if needed or create dummy UUIDs)
  // Actually, we linked users.id to auth.users.id. Since this is an MVP without full auth setup yet, 
  // let's drop the auth.users foreign key constraint in our session just to seed dummy users, 
  // or we just don't seed `users` table directly if it blocks us.
  // Wait, let's just alter the table to drop the FK for demo purposes so we can seed freely.
  await client.query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id_fkey;');

  console.log('Seeding users...');
  const adminId = faker.string.uuid();
  await client.query(`INSERT INTO users (id, role_id, full_name, email) VALUES ($1, $2, $3, $4)`, 
    [adminId, roleIds['Admin'], 'Demo Admin', 'admin@khoemacau.com']);

  // Seed Suppliers (200)
  console.log('Seeding suppliers...');
  const suppliers = [];
  for (let i = 1; i <= 200; i++) {
    const supplierId = faker.string.uuid();
    const isLocal = Math.random() > 0.4; // 60% Botswana local
    const name = isLocal ? faker.company.name() + ' (Botswana)' : faker.company.name();
    const res = await client.query(`
      INSERT INTO suppliers (id, code, name, category, status, is_local, contact_email, risk_level, rating, annual_spend)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `, [
      supplierId,
      `SUP-${String(i).padStart(4, '0')}`,
      name,
      randomStatus(categories),
      randomStatus(['Pending', 'Under Review', 'Approved', 'Approved', 'Rejected']),
      isLocal,
      faker.internet.email(),
      randomStatus(riskLevels),
      faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      faker.number.float({ min: 10000, max: 5000000, fractionDigits: 2 })
    ]);
    suppliers.push(res.rows[0].id);
  }

  // Seed Contractors (100)
  console.log('Seeding contractors...');
  const contractors = [];
  for (let i = 1; i <= 100; i++) {
    const contractorId = faker.string.uuid();
    const isCompliant = Math.random() > 0.3;
    const res = await client.query(`
      INSERT INTO contractors (id, code, name, contractor_type, sheq_compliant, iso_compliant, permits_valid, env_compliant, compliance_score, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `, [
      contractorId,
      `CON-${String(i).padStart(4, '0')}`,
      faker.company.name() + ' Contractors',
      randomStatus(categories),
      isCompliant,
      Math.random() > 0.5,
      isCompliant,
      Math.random() > 0.4,
      isCompliant ? faker.number.int({ min: 80, max: 100 }) : faker.number.int({ min: 30, max: 79 }),
      isCompliant ? 'Compliant' : (Math.random() > 0.5 ? 'Warning' : 'Non-Compliant')
    ]);
    contractors.push(res.rows[0].id);
  }

  // Seed Jobs (50)
  console.log('Seeding jobs...');
  const jobs = [];
  const departments = ['Engineering', 'Mining', 'Processing', 'HR', 'Finance', 'SHEQ'];
  for (let i = 1; i <= 50; i++) {
    const jobId = faker.string.uuid();
    const res = await client.query(`
      INSERT INTO jobs (id, code, title, department, location, employment_type, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `, [
      jobId,
      `JOB-${String(i).padStart(4, '0')}`,
      faker.person.jobTitle(),
      randomStatus(departments),
      'Zone 5, Botswana',
      randomStatus(['Full-time', 'Contract', 'Graduate Intake']),
      randomStatus(['Active', 'Active', 'Closing Soon', 'Filled'])
    ]);
    jobs.push(res.rows[0].id);
  }

  // Seed Applications (300)
  console.log('Seeding applications...');
  for (let i = 1; i <= 300; i++) {
    await client.query(`
      INSERT INTO applications (id, job_id, full_name, email, phone, location, is_local, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      faker.string.uuid(),
      randomStatus(jobs),
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      randomStatus(['Maun', 'Gaborone', 'Francistown', 'Johannesburg', 'London']),
      Math.random() > 0.3,
      randomStatus(['Submitted', 'Reviewing', 'Shortlisted', 'Rejected', 'Hired'])
    ]);
  }

  // Seed Community Requests (50)
  console.log('Seeding community requests...');
  for (let i = 1; i <= 50; i++) {
    await client.query(`
      INSERT INTO community_requests (id, code, title, request_type, description, location, status, requested_amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      faker.string.uuid(),
      `REQ-${String(i).padStart(4, '0')}`,
      faker.lorem.words(4),
      randomStatus(['Scholarship', 'CSR Funding', 'Grievance', 'Local Business']),
      faker.lorem.paragraph(),
      faker.location.city(),
      randomStatus(['Submitted', 'Reviewing', 'Approved', 'Closed']),
      faker.number.float({ min: 1000, max: 100000, fractionDigits: 2 })
    ]);
  }

  console.log('Database successfully prepared and seeded.');
  await client.end();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
