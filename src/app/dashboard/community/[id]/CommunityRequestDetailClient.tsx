"use client";

import React from "react";
import { Card, Descriptions, Tag, Button, Space } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default function CommunityRequestDetailClient({ request }: { request: any }) {
  if (!request) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2>Request not found</h2>
        <Link href="/dashboard/community">
          <Button type="primary">← Back to Community Hub</Button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{request.title}</h1>
          <Space size="small" style={{ marginTop: 8 }}>
            <Tag>{request.code}</Tag>
            <Tag color={request.status === "Approved" ? "success" : "processing"}>{request.status}</Tag>
            <Tag color="purple">{request.request_type}</Tag>
          </Space>
        </div>
        <Space>
          <Link href="/dashboard/community">
            <Button>← Back</Button>
          </Link>
          <Button type="primary" icon={<CheckCircleOutlined />}>Approve</Button>
          <Button danger icon={<CloseCircleOutlined />}>Reject</Button>
        </Space>
      </div>

      <Card>
        <Descriptions title="Request Information" bordered column={1}>
          <Descriptions.Item label="Location">{request.location}</Descriptions.Item>
          <Descriptions.Item label="Requested Amount">{request.requested_amount ? `BWP ${request.requested_amount.toLocaleString()}` : 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Description">{request.description}</Descriptions.Item>
          <Descriptions.Item label="Submitted Date">{new Date(request.created_at).toLocaleDateString()}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
