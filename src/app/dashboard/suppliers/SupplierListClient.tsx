"use client";

import React, { useState } from "react";
import { Table, Tag, Input, Button, Space, Modal, Form, Select, message } from "antd";
import { SearchOutlined, PlusOutlined, ExportOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function SupplierListClient({ suppliers }: { suppliers: any[] }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase()) ||
      s.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: "Supplier Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text} {record.is_local && <span title="Botswana Based">🇧🇼</span>}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.contact_email}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "Active" || status === "Approved") color = "success";
        if (status === "Suspended" || status === "Rejected") color = "error";
        if (status === "Pending" || status === "Under Review") color = "warning";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Approved', value: 'Approved' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Suspended', value: 'Suspended' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: "Risk Level",
      dataIndex: "risk_level",
      key: "risk_level",
      render: (risk: string) => {
        let color = "success";
        if (risk === "Medium") color = "warning";
        if (risk === "High") color = "error";
        return <Tag color={color}>{risk}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/dashboard/suppliers/${record.id}`}>
            <Button type="link" icon={<EyeOutlined />}>View</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const handleAddSubmit = async (values: any) => {
    // In a real app we would POST this to Supabase
    message.success("Supplier registration submitted successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Supplier Network</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage onboarding and procurement directory.</p>
        </div>
        <Space>
          <Button icon={<ExportOutlined />} onClick={() => message.info("Exporting CSV... Please wait.")}>Export CSV</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Onboard Supplier
          </Button>
        </Space>
      </div>

      <div style={{ background: "var(--surface-1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "1rem", maxWidth: 300 }}>
          <Input 
            placeholder="Search suppliers by name or code..." 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={handleSearch}
            allowClear
          />
        </div>
        
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id" 
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => {
              router.push(`/dashboard/suppliers/${record.id}`);
            },
            style: { cursor: 'pointer' }
          })}
        />
      </div>

      <Modal
        title="Onboard New Supplier"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
          <Form.Item name="name" label="Company Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              <Option value="Engineering">Engineering</Option>
              <Option value="Logistics">Logistics</Option>
              <Option value="Equipment supply">Equipment supply</Option>
              <Option value="Catering">Catering</Option>
              <Option value="Construction">Construction</Option>
            </Select>
          </Form.Item>
          <Form.Item name="email" label="Contact Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="is_local" label="Botswana Local Company">
            <Select defaultValue="false">
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit Registration</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
