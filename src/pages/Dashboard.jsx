import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

function Dashboard() {
  return (
    <Card>
      <Title level={3}>Dashboard</Title>

      <Paragraph>
        Welcome to the Dry Cleaning Order & Invoice Management System.
      </Paragraph>
    </Card>
  );
}

export default Dashboard;
