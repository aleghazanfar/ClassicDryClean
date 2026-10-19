import { Button, Card, Form, Input, Typography } from "antd";

const { Title, Paragraph } = Typography;
import "../style/style.css";
import { useEffect, useState } from "react";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const seedData = [
      { id: 1, name: "ghazanfar", location: "Islamabad" },
      { id: 2, name: "habib", location: "Lahore" },
    ];
    setItems(seedData);
  }, []);

  const handlesubmitt = (values) => {
    const newItem = {
      id: values.id.trim(),
      name: values.name.trim(),
      location: values.location.trim(),
    };

    setItems((prev) => [...prev, newItem]);
  };
  return (
    <Card className="cardBorder">
      <Title level={3}>Dashboard</Title>

      <Paragraph>
        Welcome to the Dry Cleaning Order & Invoice Management System.
      </Paragraph>
      <div>
        <div>
          <Form
            layout="vertical"
            className="flexDash"
            form={form}
            onFinish={handlesubmitt}
          >
            <Form.Item
              label="Id"
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer name.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter Id " size="large" />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer name.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter customer name" size="large" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer name.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter Location" size="large" />
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Save Order
            </Button>
          </Form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default Dashboard;
