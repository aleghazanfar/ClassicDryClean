import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;
import "../style/style.css";

function Dashboard() {
  return (
    <Card className="cardBorder">
      <Title level={3}>Dashboard</Title>

      <Paragraph>
        Welcome to the Dry Cleaning Order & Invoice Management System.
      </Paragraph>
    </Card>
  );
}

export default Dashboard;
