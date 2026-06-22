"use client";

import React, { useState } from "react";
import { Table, Tag, Input, Button, Space, Modal, Form, Select, message, Statistic, Card, Row, Col, Typography } from "antd";
import { SearchOutlined, PlusOutlined, TeamOutlined, BankOutlined, FundOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Option } = Select;
const { Text } = Typography;

export default function CommunityClient({ requests }: { requests: any[] }) {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredRequests = requests.filter(
    (r) => r.title.toLowerCase().includes(searchText.toLowerCase()) || r.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Code", dataIndex: "code", key: "code", render: (text: string) => <strong>{text}</strong> },
    { 
      title: "Request Details", 
      key: "details",
      render: (_: any, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.title}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.location}</div>
        </div>
      )
    },
    { 
      title: "Type", 
      dataIndex: "request_type", 
      key: "request_type",
      render: (type: string) => {
        let color = "default";
        if (type === "Scholarship") color = "blue";
        if (type === "CSR Funding") color = "purple";
        if (type === "Grievance") color = "volcano";
        if (type === "Local Business") color = "cyan";
        return <Tag color={color}>{type}</Tag>;
      }
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status: string) => {
        let color = "processing";
        if (status === "Approved" || status === "Closed") color = "success";
        return <Tag color={color}>{status}</Tag>;
      }
    },
    { 
      title: "Requested Amount", 
      dataIndex: "requested_amount", 
      key: "requested_amount",
      render: (amount: number) => amount ? `BWP ${amount.toLocaleString()}` : '-'
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Link href={`/dashboard/community/${record.id}`}>
          <Button type="link">Review</Button>
        </Link>
      )
    }
  ];

  const handleSubmit = () => {
    message.success("Community request submitted successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Community Impact Hub</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage scholarships, CSR funding, and grievances.</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          New Request
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Total Requests" value={requests.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Total CSR Funding Requested" value={requests.reduce((sum, r) => sum + (r.requested_amount || 0), 0)} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Approved Requests" value={requests.filter(r => r.status === 'Approved').length} valueStyle={{ color: '#3f8600' }} prefix={<FundOutlined />} />
          </Card>
        </Col>
      </Row>

      <div style={{ background: "var(--surface-1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "1rem", maxWidth: 300 }}>
          <Input 
            placeholder="Search community requests..." 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>
        
        <Table columns={columns} dataSource={filteredRequests} rowKey="id" pagination={{ pageSize: 10 }} />
      </div>

      <Modal
        title="Submit Community Request"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Request Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Request Type" rules={[{ required: true }]}>
            <Select>
              <Option value="Scholarship">Scholarship</Option>
              <Option value="CSR Funding">CSR Funding</Option>
              <Option value="Grievance">Grievance</Option>
              <Option value="Local Business">Local Business Support</Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Requested Amount (BWP)">
            <Input type="number" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit Request</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
