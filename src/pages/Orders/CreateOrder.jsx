import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

const { Title, Text } = Typography;

const CreateOrder = () => {
  const [form] = Form.useForm();
  const handleSaveOrder = (values) => {
    console.log("Order Data:", values);

    message.success("Order validated successfully!");
  };

  const quantity = Form.useWatch("quantity", form);
  const unitPrice = Form.useWatch("unitPrice", form);

  const amount = (Number(quantity) || 0) * (Number(unitPrice) || 0);
  // the the form value for discount
  const discount = Form.useWatch("discount", form) ?? 0;
  const grandTotal = Math.max(0, amount - (Number(discount) || 0));
  const advancePayment = Form.useWatch("advancePayment", form) ?? 0;

  const balanceDue = Math.max(0, grandTotal - (Number(advancePayment) || 0));

  const paymentStatus =
    grandTotal === 0
      ? "Unpaid"
      : advancePayment >= grandTotal
        ? "Paid"
        : advancePayment > 0
          ? "Partially Paid"
          : "Unpaid";

  return (
    <>
      <div className="create-order-page">
        <div className="page-heading">
          <Title level={3} style={{ background: "red", color: "white" }}>
            Create New Order
          </Title>

          <Text type="secondary">
            Create a new dry cleaning order for your customer.
          </Text>
        </div>
        <Form form={form} layout="vertical" onFinish={handleSaveOrder}>
          <Card title="Customer Information" bordered>
            {" "}
            <Row gutter={16}>
              {" "}
              <Col xs={24} md={12}>
                {" "}
                <Form.Item
                  label="Customer Name"
                  name="customerName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the customer name.",
                    },
                  ]}
                >
                  <Input placeholder="Enter customer name" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number.",
                    },
                  ]}
                >
                  <Input placeholder="e.g. 03001234567" size="large" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Order Information" bordered style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Order Date"
                  name="orderDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select the order date.",
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    placeholder="Select order date"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Expected Delivery Date"
                  name="deliveryDate"
                  rules={[
                    {
                      required: true,
                      message: "Please select the expected delivery date.",
                    },
                    {
                      validator: (_, value) => {
                        const orderDate = form.getFieldValue("orderDate");

                        if (
                          !value ||
                          !orderDate ||
                          !value.isBefore(orderDate, "day")
                        ) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "Delivery date cannot be earlier than the order date.",
                          ),
                        );
                      },
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    format="DD-MM-YYYY"
                    placeholder="Select delivery date"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Garment Details" bordered style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Garment Type"
                  name="garmentType"
                  rules={[
                    {
                      required: true,
                      message: "Please select a garment type.",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select garment type"
                    options={[
                      { value: "shirt", label: "Shirt" },
                      { value: "trouser", label: "Trouser" },
                      { value: "suit", label: "Suit" },
                      { value: "shalwar-kameez", label: "Shalwar Kameez" },
                      { value: "coat", label: "Coat" },
                      { value: "jacket", label: "Jacket" },
                      { value: "dress", label: "Dress" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Cleaning Service"
                  name="cleaningService"
                  rules={[
                    {
                      required: true,
                      message: "Please select a cleaning service.",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select cleaning service"
                    options={[
                      { value: "dry-clean", label: "Dry Clean" },
                      { value: "wash-iron", label: "Wash & Iron" },
                      { value: "wash-only", label: "Wash Only" },
                      { value: "iron-only", label: "Iron Only" },
                      { value: "steam-press", label: "Steam Press" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the quantity.",
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    min={1}
                    precision={0}
                    style={{ width: "100%" }}
                    placeholder="Enter quantity"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Unit Price (Rs.)"
                  name="unitPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the unit price.",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Unit price cannot be negative.",
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    min={0}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="Enter unit price"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Amount (Rs.)">
                  <Input
                    size="large"
                    value={amount.toLocaleString("en-PK", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Order Summary" bordered style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item label="Subtotal (Rs.)">
                  <Input
                    size="large"
                    value={amount.toLocaleString("en-PK", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    disabled
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Discount (Rs.)" name="discount">
                  <InputNumber
                    size="large"
                    min={0}
                    max={amount}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="Enter discount"
                  />
                </Form.Item>
              </Col>
            </Row>
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: "#f0f5ff",
                borderRadius: 8,
              }}
            >
              <Typography.Text type="secondary">Grand Total</Typography.Text>

              <Title level={2} style={{ margin: "8px 0 0" }}>
                Rs.{" "}
                {grandTotal.toLocaleString("en-PK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Title>
            </div>
          </Card>
          <Card title="Payment Information" bordered style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={8}>
                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[
                    {
                      required: true,
                      message: "Please select a payment method.",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select payment method"
                    options={[
                      { value: "cash", label: "Cash" },
                      { value: "card", label: "Card" },
                      { value: "bank-transfer", label: "Bank Transfer" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item
                  label="Advance Payment (Rs.)"
                  name="advancePayment"
                  dependencies={["discount", "quantity", "unitPrice"]}
                  rules={[
                    {
                      required: true,
                      message: "Please enter the advance payment.",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Payment cannot be negative.",
                    },
                    {
                      validator: (_, value) => {
                        if (value == null || value <= grandTotal) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error("Payment cannot exceed the grand total."),
                        );
                      },
                    },
                  ]}
                >
                  <InputNumber
                    size="large"
                    min={0}
                    max={grandTotal}
                    precision={2}
                    style={{ width: "100%" }}
                    placeholder="Enter advance payment"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item label="Balance Due (Rs.)">
                  <Input
                    size="large"
                    value={balanceDue.toLocaleString("en-PK", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>

            <div
              style={{
                marginTop: 8,
                padding: 16,
                background: "#f5f7fb",
                borderRadius: 8,
              }}
            >
              <Typography.Text type="secondary">Payment Status</Typography.Text>

              <Title level={4} style={{ margin: "8px 0 0" }}>
                {paymentStatus}
              </Title>
            </div>
          </Card>
          <Card title="Order Notes" bordered style={{ marginTop: 16 }}>
            <Form.Item label="Special Instructions" name="notes">
              <Input.TextArea
                rows={4}
                maxLength={500}
                showCount
                placeholder="Enter special instructions for this order..."
              />
            </Form.Item>
          </Card>
          <Space
            size="middle"
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button size="large" onClick={() => form.resetFields()}>
              Reset Form
            </Button>

            <Button type="primary" htmlType="submit" size="large">
              Save Order
            </Button>
          </Space>
        </Form>
      </div>
    </>
  );
};

export default CreateOrder;
