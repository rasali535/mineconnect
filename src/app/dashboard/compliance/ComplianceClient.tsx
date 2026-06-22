"use client";

import React, { useState } from "react";
import { Table, Tag, Input, Button, Space, Progress, Card, Row, Col, Statistic } from "antd";
import { SearchOutlined, SafetyCertificateOutlined, WarningOutlined, FileExclamationOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ComplianceClient({ contractors }: { contractors: any[] }) {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = contractors.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Contractor",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.code}</div>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "contractor_type",
      key: "contractor_type",
    },
    {
      title: "Compliance Score",
      dataIndex: "compliance_score",
      key: "compliance_score",
      render: (score: number) => (
        <Progress 
          percent={score} 
          size="small" 
          status={score >= 80 ? 'success' : score >= 50 ? 'active' : 'exception'}
          strokeColor={score >= 80 ? '#52c41a' : score >= 50 ? '#faad14' : '#ff4d4f'}
        />
      ),
      sorter: (a: any, b: any) => a.compliance_score - b.compliance_score,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = "default";
        if (status === "Compliant") color = "success";
        if (status === "Non-Compliant") color = "error";
        if (status === "Warning") color = "warning";
        return <Tag color={color}>{status}</Tag>;
      },
      filters: [
        { text: 'Compliant', value: 'Compliant' },
        { text: 'Warning', value: 'Warning' },
        { text: 'Non-Compliant', value: 'Non-Compliant' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link href={`/dashboard/compliance/${record.id}`}>
            <Button type="link">View Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const compliantCount = contractors.filter(c => c.status === "Compliant").length;
  const warningCount = contractors.filter(c => c.status === "Warning").length;
  const nonCompliantCount = contractors.filter(c => c.status === "Non-Compliant").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Site Compliance & Safety Hub</h1>
          <p style={{ color: "var(--text-secondary)" }}>Track contractor compliance, safety certifications, and expiries.</p>
        </div>
      </div>

      <Row gutter={16}>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Total Contractors" value={contractors.length} prefix={<SafetyCertificateOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Compliant" value={compliantCount} valueStyle={{ color: '#3f8600' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Expiring Soon / Warning" value={warningCount} valueStyle={{ color: '#faad14' }} prefix={<WarningOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Statistic title="Non-Compliant" value={nonCompliantCount} valueStyle={{ color: '#cf1322' }} prefix={<FileExclamationOutlined />} />
          </Card>
        </Col>
      </Row>

      <div style={{ background: "var(--surface-1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
        <div style={{ marginBottom: "1rem", maxWidth: 300 }}>
          <Input 
            placeholder="Search contractors..." 
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
              router.push(`/dashboard/compliance/${record.id}`);
            },
            style: { cursor: 'pointer' }
          })}
        />
      </div>
    </div>
  );
}
