"use client";

import React from "react";
import { Card, Descriptions, Tag, Button, Space, Progress } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { applicantsData, jobsData } from "@/lib/data";
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined } from "@ant-design/icons";

export default function ApplicantDetailClient() {
  const { id } = useParams();
  const applicant = applicantsData.find((a) => a.id === id);
  const job = applicant ? jobsData.find((j) => j.id === applicant.job) : null;

  if (!applicant) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2>Applicant not found</h2>
        <Link href="/dashboard/recruitment">
          <Button type="primary">← Back to Recruitment</Button>
        </Link>
      </div>
    );
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Applied": return "default";
      case "Screening": return "processing";
      case "Interview": return "warning";
      case "Offer": return "success";
      default: return "default";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>{applicant.name}</h1>
          <Space size="small" style={{ marginTop: 8 }}>
            <Tag>{applicant.id}</Tag>
            <Tag color={getStageColor(applicant.stage)}>{applicant.stage}</Tag>
            {job && <Tag color="blue">Applied for: {job.title}</Tag>}
          </Space>
        </div>
        <Space>
          <Link href={`/dashboard/recruitment/jobs/${applicant.job}`}>
            <Button>← Back to Job</Button>
          </Link>
          <Button type="primary" icon={<CheckCircleOutlined />}>Move to Next Stage</Button>
          <Button danger icon={<CloseCircleOutlined />}>Reject</Button>
        </Space>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        <Card>
          <Descriptions title={<><UserOutlined /> Candidate Profile</>} bordered column={1}>
            <Descriptions.Item label="Email">{applicant.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{applicant.phone}</Descriptions.Item>
            <Descriptions.Item label="Location">{applicant.location}</Descriptions.Item>
            <Descriptions.Item label="Experience">{applicant.experience}</Descriptions.Item>
            <Descriptions.Item label="Education">{applicant.education}</Descriptions.Item>
            <Descriptions.Item label="Summary">{applicant.summary}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title="AI Screening Score">
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <Progress 
              type="dashboard" 
              percent={applicant.score} 
              strokeColor={applicant.score >= 80 ? '#52c41a' : applicant.score >= 60 ? '#faad14' : '#ff4d4f'}
            />
            <p style={{ marginTop: 16, color: "var(--text-secondary)" }}>
              Based on required qualifications, experience, and historical performance data for similar roles.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
