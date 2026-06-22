"use client";

import React, { useState } from "react";
import { Table, Tag, Input, Button, Space, Modal, Form, DatePicker, message, Statistic, Card, Row, Col, Progress } from "antd";
import { PlusOutlined, EnvironmentOutlined, ThunderboltOutlined, GlobalOutlined } from "@ant-design/icons";

export default function ESGClient({ esgData }: { esgData: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    { 
      title: "Metric", 
      dataIndex: "metric", 
      key: "metric",
      render: (text: string) => <strong style={{ color: "var(--brand-500)" }}>{text}</strong>
    },
    { 
      title: "Value", 
      dataIndex: "value", 
      key: "value",
      render: (val: number, record: any) => `${val} ${record.unit}`
    },
    { 
      title: "Target", 
      dataIndex: "target", 
      key: "target",
      render: (target: number, record: any) => `${target} ${record.unit}`
    },
    { 
      title: "Progress", 
      key: "progress",
      render: (_: any, record: any) => {
        // Lower is better for emissions/water usually, but let's assume standard progress here
        const percent = Math.min(100, Math.round((record.value / record.target) * 100));
        return <Progress percent={percent} size="small" />;
      }
    },
    { 
      title: "Date", 
      dataIndex: "recorded_at", 
      key: "recorded_at",
      render: (date: string) => new Date(date).toLocaleDateString()
    }
  ];

  const handleSubmit = () => {
    message.success("ESG report entry logged successfully!");
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>ESG & Sustainability</h1>
          <p style={{ color: "var(--text-secondary)" }}>Monitor environmental impact and sustainability KPIs.</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Log Report Entry
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Carbon Emissions (tons)" value={12500} prefix={<EnvironmentOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Water Usage (kL)" value={45000} prefix={<GlobalOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless">
            <Statistic title="Energy Consumption (MWh)" value={8200} prefix={<ThunderboltOutlined />} />
          </Card>
        </Col>
      </Row>

      <div style={{ background: "var(--surface-1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <h3 style={{ marginBottom: 16 }}>Recent ESG Metrics</h3>
        <Table columns={columns} dataSource={esgData} rowKey="id" pagination={{ pageSize: 10 }} />
      </div>

      <Modal
        title="Log ESG Report Entry"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="metric" label="Metric Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., CO2 Emissions" />
          </Form.Item>
          <Form.Item name="value" label="Value" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="unit" label="Unit" rules={[{ required: true }]}>
            <Input placeholder="e.g., tons" />
          </Form.Item>
          <Form.Item name="recorded_at" label="Recording Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Submit Entry</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
