"use client";

import React, { useState } from "react";
import { Tabs, Descriptions, Card, Tag, Button, List, Space, Progress, Alert, message } from "antd";
import { SafetyCertificateOutlined, FilePdfOutlined, DownloadOutlined } from "@ant-design/icons";

export default function ContractorDetailClient({ contractor }: { contractor: any }) {
  if (!contractor) return <div>Contractor not found.</div>;

  const overviewItems = [
    { key: "1", label: "Registration No.", children: `REG-${contractor.code}` },
    { key: "2", label: "Contractor Type", children: contractor.contractor_type },
    { key: "3", label: "SHEQ Compliant", children: contractor.sheq_compliant ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag> },
    { key: "4", label: "ISO Compliant", children: contractor.iso_compliant ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag> },
    { key: "5", label: "Permits Valid", children: contractor.permits_valid ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag> },
    { key: "6", label: "Env Compliant", children: contractor.env_compliant ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {contractor.status === 'Warning' && (
        <Alert message="Warning: Approaching Compliance Expiry" type="warning" showIcon />
      )}
      {contractor.status === 'Non-Compliant' && (
        <Alert message="Alert: Non-Compliant Contractor" type="error" showIcon />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            {contractor.name}
          </h1>
          <Space size="small" style={{ marginTop: 8 }}>
            <Tag>{contractor.code}</Tag>
            <Tag color={contractor.status === "Compliant" ? "success" : contractor.status === "Warning" ? "warning" : "error"}>
              {contractor.status}
            </Tag>
          </Space>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Compliance Score</div>
          <Progress 
            type="circle" 
            percent={contractor.compliance_score} 
            size={60}
            strokeColor={contractor.compliance_score >= 80 ? '#52c41a' : contractor.compliance_score >= 50 ? '#faad14' : '#ff4d4f'}
          />
        </div>
      </div>

      <Card>
        <Tabs defaultActiveKey="overview" items={[
          {
            key: "overview",
            label: "Overview",
            children: (
              <div style={{ marginTop: 16 }}>
                <Descriptions title="Compliance Information" bordered items={overviewItems} column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }} />
              </div>
            )
          },
          {
            key: "documents",
            label: "Documents",
            children: (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <Button type="primary" onClick={() => message.info('Opening upload dialog...')}>Upload Compliance Document</Button>
                </div>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { title: 'SHEQ Certificate', date: '2025-06-30' },
                    { title: 'ISO 45001 Certification', date: '2024-12-15' },
                    { title: 'Environmental Permit', date: '2025-11-20' },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[<Button key="download" type="link" icon={<DownloadOutlined />} onClick={() => message.success('File downloading...')}>Download</Button>]}
                    >
                      <List.Item.Meta
                        avatar={<SafetyCertificateOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                        title={item.title}
                        description={`Valid until ${item.date}`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            )
          }
        ]} />
      </Card>
    </div>
  );
}
