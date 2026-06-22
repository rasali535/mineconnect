"use client";

import React, { useState } from "react";
import { Table, Tag, Input, Button, Space, Tabs, Modal, Form, Select, message, Statistic, Card, Row, Col } from "antd";
import { SearchOutlined, PlusOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Option } = Select;

export default function RecruitmentClient({ jobs, applications }: { jobs: any[], applications: any[] }) {
  const [activeTab, setActiveTab] = useState("jobs");
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredJobs = jobs.filter(
    (j) => j.title.toLowerCase().includes(searchText.toLowerCase()) || j.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredApplications = applications.filter(
    (a) => a.full_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const jobsColumns = [
    { title: "Job Code", dataIndex: "code", key: "code", render: (text: string) => <strong>{text}</strong> },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Type", dataIndex: "employment_type", key: "employment_type" },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status: string) => {
        let color = "success";
        if (status === "Closing Soon") color = "warning";
        if (status === "Filled") color = "default";
        return <Tag color={color}>{status}</Tag>;
      }
    },
    { 
      title: "Applications", 
      key: "apps",
      render: (_: any, record: any) => {
        const count = applications.filter(a => a.job_id === record.id).length;
        return <span>{count}</span>;
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/dashboard/recruitment/jobs/${record.id}`}>
          <Button type="link">View</Button>
        </Link>
      )
    }
  ];

  const applicationsColumns = [
    { 
      title: "Candidate", 
      dataIndex: "full_name", 
      key: "full_name",
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text} {record.is_local && "🇧🇼"}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.email}</div>
        </div>
      )
    },
    { 
      title: "Applied For", 
      key: "job",
      render: (_: any, record: any) => {
        const job = jobs.find(j => j.id === record.job_id);
        return job ? job.title : "Unknown Job";
      }
    },
    { title: "Location", dataIndex: "location", key: "location" },
    { 
      title: "Stage", 
      dataIndex: "status", 
      key: "status",
      render: (status: string) => {
        let color = "processing";
        if (status === "Hired") color = "success";
        if (status === "Rejected") color = "error";
        if (status === "Shortlisted") color = "purple";
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/dashboard/recruitment/applicants/${record.id}`}>
          <Button type="link">Review</Button>
        </Link>
      )
    }
  ];

  const handlePostJob = () => {
    message.success("Job posted successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Careers & Talent Portal</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage job listings, applicant tracking, and recruitment pipelines.</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Post Job
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Active Jobs" value={jobs.filter(j => j.status === 'Active').length} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Total Applications" value={applications.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Local Candidates (Botswana)" value={applications.filter(a => a.is_local).length} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
      </Row>

      <div style={{ background: "var(--surface-1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "1rem", maxWidth: 300 }}>
          <Input 
            placeholder={`Search ${activeTab}...`} 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>
        
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: "jobs",
              label: `Job Listings (${jobs.length})`,
              children: <Table columns={jobsColumns} dataSource={filteredJobs} rowKey="id" />
            },
            {
              key: "applications",
              label: `Applications (${applications.length})`,
              children: <Table columns={applicationsColumns} dataSource={filteredApplications} rowKey="id" />
            }
          ]}
        />
      </div>

      <Modal
        title="Post New Job"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handlePostJob}>
          <Form.Item name="title" label="Job Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department" rules={[{ required: true }]}>
            <Select>
              <Option value="Engineering">Engineering</Option>
              <Option value="Mining">Mining</Option>
              <Option value="Processing">Processing</Option>
              <Option value="HR">HR</Option>
              <Option value="SHEQ">SHEQ</Option>
            </Select>
          </Form.Item>
          <Form.Item name="employment_type" label="Employment Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Full-time">Full-time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Graduate Intake">Graduate Intake</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Post Job</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
