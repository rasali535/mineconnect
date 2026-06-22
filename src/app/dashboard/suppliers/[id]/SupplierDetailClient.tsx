"use client";

import React, { useState } from "react";
import { Tabs, Descriptions, Card, Tag, Button, Modal, message, List, Space } from "antd";
import { WarningOutlined, FilePdfOutlined, EditOutlined, DownloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SupplierDetailClient({ supplier }: { supplier: any }) {
  const router = useRouter();
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  if (!supplier) {
    return <div>Supplier not found.</div>;
  }

  const handleSuspend = () => {
    // In a real app we'd call Supabase here
    message.success(`Supplier ${supplier.name} has been ${supplier.status === 'Suspended' ? 'reinstated' : 'suspended'}.`);
    setIsSuspendModalOpen(false);
    router.refresh();
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": case "Approved": return "success";
      case "Suspended": case "Rejected": return "error";
      case "Pending": case "Under Review": return "warning";
      default: return "default";
    }
  };

  const overviewItems = [
    { key: "1", label: "Registration No.", children: `REG-${supplier.code}` },
    { key: "2", label: "Contact Email", children: supplier.contact_email },
    { key: "3", label: "Risk Level", children: <Tag color={supplier.risk_level === "High" ? "error" : "success"}>{supplier.risk_level}</Tag> },
    { key: "4", label: "Local Supplier", children: supplier.is_local ? "Yes (Botswana)" : "No" },
    { key: "5", label: "Category", children: supplier.category },
    { key: "6", label: "Annual Spend", children: `BWP ${supplier.annual_spend?.toLocaleString()}` },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            {supplier.name} {supplier.is_local && "🇧🇼"}
          </h1>
          <Space size="small" style={{ marginTop: 8 }}>
            <Tag>{supplier.code}</Tag>
            <Tag color={getStatusColor(supplier.status)}>{supplier.status}</Tag>
          </Space>
        </div>
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button danger onClick={() => setIsSuspendModalOpen(true)}>
            {supplier.status === "Suspended" ? "Reinstate" : "Suspend"}
          </Button>
        </Space>
      </div>

      <Card>
        <Tabs defaultActiveKey="overview" items={[
          {
            key: "overview",
            label: "Overview",
            children: (
              <div style={{ marginTop: 16 }}>
                <Descriptions title="Company Information" bordered items={overviewItems} column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }} />
              </div>
            )
          },
          {
            key: "documents",
            label: "Documents",
            children: (
              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <Button type="primary">Upload Document</Button>
                </div>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { title: 'Tax Clearance Certificate', date: '2025-01-15' },
                    { title: 'Company Registration', date: '2024-11-20' }
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[<Button key="download" type="link" icon={<DownloadOutlined />}>Download</Button>]}
                    >
                      <List.Item.Meta
                        avatar={<FilePdfOutlined style={{ fontSize: 24, color: '#ff4d4f' }} />}
                        title={item.title}
                        description={`Uploaded on ${item.date}`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            )
          }
        ]} />
      </Card>

      <Modal
        title={<><WarningOutlined style={{ color: '#faad14' }} /> {supplier.status === "Suspended" ? "Reinstate" : "Suspend"} Supplier</>}
        open={isSuspendModalOpen}
        onOk={handleSuspend}
        onCancel={() => setIsSuspendModalOpen(false)}
        okText="Confirm"
        okButtonProps={{ danger: supplier.status !== "Suspended" }}
      >
        <p>
          Are you sure you want to {supplier.status === "Suspended" ? "reinstate" : "suspend"} <strong>{supplier.name}</strong>?
        </p>
      </Modal>
    </div>
  );
}
