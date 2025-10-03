import { useEffect, useState } from "react";
import { Modal, Card, Typography, Space, Button, message } from "antd";
import {
  UserOutlined,
  KeyOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./CredentialsModal.css";

const { Title, Text } = Typography;

interface CredentialsModalProps {
  autoOpen?: boolean;
  onClose?: () => void;
  type: "admin"; // Updated type for admin
}

export default function CredentialsModal({
  autoOpen = true,
  onClose,
  type,
}: CredentialsModalProps) {
  const [isVisible, setIsVisible] = useState(autoOpen);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (autoOpen) {
      setIsVisible(true);
    }
  }, [autoOpen]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      message.success("Copied to clipboard!");
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const CredentialRow = ({
    label,
    value,
    fieldId,
  }: {
    label: string;
    value: string;
    fieldId: string;
  }) => (
    <div className="credential-row">
      <div className="credential-label-value">
        <Text className="label">{label}</Text>
        <code className="credential-value">{value}</code>
      </div>
      <Button
        type="text"
        size="small"
        icon={
          copiedField === fieldId ? (
            <CheckOutlined className="copy-icon success" />
          ) : (
            <CopyOutlined className="copy-icon" />
          )
        }
        onClick={() => copyToClipboard(value, fieldId)}
        className="copy-button"
      />
    </div>
  );

  const adminCredentials = {
    username: "admin",
    password: "admin1234",
  };

  const credentials = adminCredentials;

  // Text based on the type
  const modalTitle = "بيانات الدخول للمسؤول";
  const modalSubtitle = "استخدم هذه البيانات للدخول كمسؤول";

  return (
    <Modal
      open={isVisible}
      onCancel={() => {
        setIsVisible(false);
        if (onClose) onClose();
      }}
      footer={null}
      width={560}
      centered
      className="credentials-modal"
      closeIcon={<span className="close-icon">×</span>}
      style={{ direction: "rtl" }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="header-icon-wrapper">
            <InfoCircleOutlined className="header-icon" />
          </div>
          <Title level={3} className="modal-title">
            {modalTitle}
          </Title>
          <Text className="modal-subtitle">{modalSubtitle}</Text>
        </div>

        <Space direction="vertical" size={16} className="credentials-container">
          <Card className="credential-card admin-card">
            <div className="card-header">
              <div className="icon-wrapper admin">
                <KeyOutlined className="card-icon" />
              </div>
              <Title level={4} className="card-title">
                تسجيل دخول المسؤول
              </Title>
            </div>
            <Space direction="vertical" size={12} className="credentials-list">
              <CredentialRow
                label="اسم المستخدم"
                value={credentials.username}
                fieldId="admin-username"
              />
              <CredentialRow
                label="كلمة المرور"
                value={credentials.password}
                fieldId="admin-password"
              />
            </Space>
          </Card>

          <div className="info-banner">
            <InfoCircleOutlined className="info-icon" />
            <Text className="info-text">
              هذه بيانات تجريبية للاستخدام فقط في العروض التوضيحية.
            </Text>
          </div>
        </Space>
      </div>
    </Modal>
  );
}
