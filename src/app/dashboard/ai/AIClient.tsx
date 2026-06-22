"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input, Button, List, Avatar, Card, Space, Typography } from "antd";
import { SendOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function AIClient() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Hello! I am the Debswana Connect Intelligence Assistant. I can help you search supplier documents, verify contractor compliance, or analyze ESG metrics. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the latest compliance reports, 85% of our contractors are fully compliant. I recommend reviewing the 3 contractors who are currently flagged as 'Warning' before their certificates expire next week.",
        "The supplier 'Kgalagadi Mining Services' has a Medium risk profile. They have 2 active contracts worth BWP 1.5M, but their B-BBEE certificate expires in 14 days.",
        "For Q2 2026, our water usage is 5% below the targeted threshold, which is excellent. However, CO2 emissions are slightly elevated due to increased diesel usage in Sector 4.",
        "I've checked the recruitment pipeline for 'Senior Geologist'. We have 12 applicants, and 3 are local Botswana citizens who meet the minimum qualifications."
      ];
      
      const aiResponse = { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", gap: "1rem" }}>
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Intelligence Assistant</h1>
        <p style={{ color: "var(--text-secondary)" }}>Ask questions about operations, compliance, or search through company documents.</p>
      </div>

      <Card 
        bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0 }} 
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', background: 'var(--surface-0)' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
              <List.Item style={{ borderBottom: 'none', padding: '0.5rem 0' }}>
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={item.role === 'assistant' ? <RobotOutlined /> : <UserOutlined />} 
                      style={{ backgroundColor: item.role === 'assistant' ? 'var(--brand-500)' : '#87d068' }}
                    />
                  }
                  title={<Text strong>{item.role === 'assistant' ? 'Debswana AI' : 'You'}</Text>}
                  description={
                    <div style={{ 
                      background: item.role === 'assistant' ? 'var(--surface-1)' : 'var(--brand-50)', 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      display: 'inline-block',
                      maxWidth: '80%',
                      color: 'var(--text-primary)'
                    }}>
                      {item.content}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem', color: 'var(--text-muted)' }}>
              <RobotOutlined style={{ color: 'var(--brand-500)', fontSize: 24 }} />
              <span>Analyzing data...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', background: 'var(--surface-1)' }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input 
              size="large"
              placeholder="Ask about compliance, suppliers, ESG metrics..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onPressEnter={handleSend}
              disabled={loading}
            />
            <Button size="large" type="primary" icon={<SendOutlined />} onClick={handleSend} loading={loading}>
              Send
            </Button>
          </Space.Compact>
        </div>
      </Card>
    </div>
  );
}
