import React from "react";

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

const { Title, Text } = Typography;

/*
|--------------------------------------------------------------------------
| Lookup Options
|--------------------------------------------------------------------------
| These are temporary options based on your existing form.
| Later, replace them with data retrieved from your ASP.NET Core API.
|--------------------------------------------------------------------------
*/

const garmentTypeOptions = [
  { value: "gents", label: "Gents" },
  { value: "ladies", label: "Ladies" },
  { value: "kids", label: "Kids" },
  { value: "household", label: "Household" },
];

const articleOptions = [
  { value: "shirt", label: "Shirt" },
  { value: "trouser", label: "Trouser" },
  { value: "suit", label: "Suit" },
  { value: "shalwar-kameez", label: "Shalwar Kameez" },
  { value: "coat", label: "Coat" },
  { value: "jacket", label: "Jacket" },
  { value: "dress", label: "Dress" },
  { value: "dupatta", label: "Dupatta" },
  { value: "shawl", label: "Shawl" },
  { value: "blanket", label: "Blanket" },
  { value: "bed-sheet", label: "Bed Sheet" },
];

const cleaningServiceOptions = [
  { value: "dry-clean", label: "Dry Clean" },
  { value: "wash-iron", label: "Wash & Iron" },
  { value: "wash-only", label: "Wash Only" },
  { value: "iron-only", label: "Iron Only" },
  { value: "steam-press", label: "Steam Press" },
];

const unitOptions = [
  { value: "piece", label: "Piece" },
  { value: "pair", label: "Pair" },
  { value: "set", label: "Set" },
];

/*
|--------------------------------------------------------------------------
| Utility Functions
|--------------------------------------------------------------------------
*/

const formatCurrency = (value) =>
  (Number(value) || 0).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const calculateItemAmount = (item) => {
  const quantity = Number(item?.quantity) || 0;
  const unitPrice = Number(item?.unitPrice) || 0;

  return quantity * unitPrice;
};

const calculateSubtotal = (items = []) => {
  return items.reduce((total, item) => total + calculateItemAmount(item), 0);
};

/*
|--------------------------------------------------------------------------
| CreateOrder Component
|--------------------------------------------------------------------------
*/

const CreateOrder = () => {
  const [form] = Form.useForm();

  /*
  |--------------------------------------------------------------------------
  | Watch Form Values
  |--------------------------------------------------------------------------
  | Form.useWatch automatically updates calculated values when the user
  | changes quantities, prices, discounts, or advance payments.
  |--------------------------------------------------------------------------
  */

  const orderItems = Form.useWatch("orderItems", form) || [];

  const discount = Form.useWatch("discount", form) ?? 0;

  const advancePayment = Form.useWatch("advancePayment", form) ?? 0;

  /*
  |--------------------------------------------------------------------------
  | Order Calculations
  |--------------------------------------------------------------------------
  */

  const subtotal = calculateSubtotal(orderItems);

  const grandTotal = Math.max(0, subtotal - (Number(discount) || 0));

  const balanceDue = Math.max(0, grandTotal - (Number(advancePayment) || 0));

  const paymentStatus =
    grandTotal === 0
      ? "Unpaid"
      : Number(advancePayment) >= grandTotal
        ? "Paid"
        : Number(advancePayment) > 0
          ? "Partially Paid"
          : "Unpaid";

  /*
  |--------------------------------------------------------------------------
  | Save Order
  |--------------------------------------------------------------------------
  | This function currently prepares the order data.
  | API integration will be added in the next implementation step.
  |--------------------------------------------------------------------------
  */

  const handleSaveOrder = (values) => {
    const items = values.orderItems || [];

    const calculatedSubtotal = calculateSubtotal(items);

    const calculatedDiscount = Number(values.discount) || 0;

    const calculatedGrandTotal = Math.max(
      0,
      calculatedSubtotal - calculatedDiscount,
    );

    const calculatedAdvancePayment = Number(values.advancePayment) || 0;

    /*
    | Recalculate all amounts before preparing the payload.
    | Do not rely on client-displayed calculated values.
    */

    const preparedItems = items.map((item) => ({
      garmentType: item.garmentType,
      article: item.article,
      cleaningService: item.cleaningService,
      unit: item.unit,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      amount: calculateItemAmount(item),
    }));

    const orderData = {
      customerName: values.customerName.trim(),

      phoneNumber: values.phoneNumber.trim(),

      orderDate: values.orderDate.format("YYYY-MM-DD"),

      deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),

      orderItems: preparedItems,

      subtotal: calculatedSubtotal,

      discount: calculatedDiscount,

      grandTotal: calculatedGrandTotal,

      paymentMethod: values.paymentMethod,

      advancePayment: calculatedAdvancePayment,

      balanceDue: Math.max(0, calculatedGrandTotal - calculatedAdvancePayment),

      paymentStatus:
        calculatedGrandTotal === 0
          ? "Unpaid"
          : calculatedAdvancePayment >= calculatedGrandTotal
            ? "Paid"
            : calculatedAdvancePayment > 0
              ? "Partially Paid"
              : "Unpaid",

      notes: values.notes?.trim() || "",
    };

    console.log("Prepared Order Data:", orderData);

    message.success("Order data prepared successfully!");
  };

  return (
    <div className="create-order-page">
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}

      <div className="page-heading">
        <Title level={3}>Create New Order</Title>

        <Text type="secondary">
          Create a new dry cleaning order for your customer.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          orderDate: dayjs(),

          discount: 0,

          advancePayment: 0,

          paymentMethod: "cash",

          orderItems: [
            {
              quantity: 1,
              unitPrice: 0,
            },
          ],
        }}
        onFinish={handleSaveOrder}
      >
        {/* ============================================================
            CUSTOMER INFORMATION
        ============================================================ */}

        <Card
          title="Customer Information"
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Customer Name"
                name="customerName"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter the customer name.",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="Enter customer name"
                  size="large"
                  maxLength={150}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter the phone number.",
                  },
                  {
                    pattern: /^\+?[0-9\s-]{10,15}$/,
                    message:
                      "Enter a valid phone number with 10–15 characters.",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="e.g. 03001234567"
                  size="large"
                  maxLength={15}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* ============================================================
            ORDER INFORMATION
        ============================================================ */}

        <Card
          title="Order Information"
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
            marginTop: 16,
          }}
        >
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
                hasFeedback
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
                dependencies={["orderDate"]}
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
                hasFeedback
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  placeholder="Select delivery date"
                  disabledDate={(current) => {
                    const orderDate = form.getFieldValue("orderDate");

                    return (
                      current && orderDate && current.isBefore(orderDate, "day")
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* ============================================================
            GARMENT DETAILS - DYNAMIC ORDER ITEMS
        ============================================================ */}

        <Card
          title="Garment Details"
          extra={
            <Text type="secondary">
              {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
            </Text>
          }
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Form.List
            name="orderItems"
            rules={[
              {
                validator: async (_, items) => {
                  if (!items || items.length === 0) {
                    throw new Error(
                      "Please add at least one garment to the order.",
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {/* GARMENT ITEMS */}

                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    title={`Garment #${index + 1}`}
                    style={{
                      marginBottom: 16,
                      background: "#fafafa",
                      borderRadius: 8,
                    }}
                    extra={
                      <Popconfirm
                        title="Remove this garment?"
                        description="This garment will be removed from the order."
                        okText="Remove"
                        cancelText="Cancel"
                        onConfirm={() => remove(field.name)}
                      >
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          aria-label={`Remove garment ${index + 1}`}
                        >
                          Remove
                        </Button>
                      </Popconfirm>
                    }
                  >
                    <Row gutter={16}>
                      {/* TYPE */}

                      <Col xs={24} sm={12} lg={4}>
                        <Form.Item
                          label="Type"
                          name={[field.name, "garmentType"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select a garment type.",
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            size="large"
                            placeholder="Select type"
                            options={garmentTypeOptions}
                          />
                        </Form.Item>
                      </Col>

                      {/* ARTICLE */}

                      <Col xs={24} sm={12} lg={4}>
                        <Form.Item
                          label="Article"
                          name={[field.name, "article"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select an article.",
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            size="large"
                            placeholder="Select article"
                            options={articleOptions}
                            showSearch
                            optionFilterProp="label"
                          />
                        </Form.Item>
                      </Col>

                      {/* CLEANING SERVICE */}

                      <Col xs={24} sm={12} lg={4}>
                        <Form.Item
                          label="Cleaning Service"
                          name={[field.name, "cleaningService"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select a cleaning service.",
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            size="large"
                            placeholder="Select service"
                            options={cleaningServiceOptions}
                          />
                        </Form.Item>
                      </Col>

                      {/* UNIT */}

                      <Col xs={24} sm={12} lg={3}>
                        <Form.Item
                          label="Unit"
                          name={[field.name, "unit"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select a unit.",
                            },
                          ]}
                          hasFeedback
                        >
                          <Select
                            size="large"
                            placeholder="Unit"
                            options={unitOptions}
                          />
                        </Form.Item>
                      </Col>

                      {/* QUANTITY */}

                      <Col xs={12} sm={8} lg={2}>
                        <Form.Item
                          label="Qty"
                          name={[field.name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Please enter quantity.",
                            },
                            {
                              type: "number",
                              min: 1,
                              message: "Quantity must be at least 1.",
                            },
                            {
                              type: "number",
                              max: 10000,
                              message: "Quantity cannot exceed 10,000.",
                            },
                          ]}
                          hasFeedback
                        >
                          <InputNumber
                            size="large"
                            min={1}
                            max={10000}
                            precision={0}
                            style={{ width: "100%" }}
                            placeholder="Qty"
                          />
                        </Form.Item>
                      </Col>

                      {/* UNIT PRICE */}

                      <Col xs={12} sm={8} lg={3}>
                        <Form.Item
                          label="Price (Rs.)"
                          name={[field.name, "unitPrice"]}
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
                            {
                              type: "number",
                              max: 10000000,
                              message:
                                "Unit price exceeds the permitted limit.",
                            },
                          ]}
                          hasFeedback
                        >
                          <InputNumber
                            size="large"
                            min={0}
                            max={10000000}
                            precision={2}
                            style={{ width: "100%" }}
                            placeholder="Price"
                          />
                        </Form.Item>
                      </Col>

                      {/* ITEM AMOUNT */}

                      <Col xs={24} sm={8} lg={4}>
                        <Form.Item label="Amount (Rs.)">
                          <Input
                            size="large"
                            value={formatCurrency(
                              calculateItemAmount(orderItems[index]),
                            )}
                            readOnly
                            style={{
                              fontWeight: 600,
                              background: "#f0f5ff",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                ))}

                {/* FORM LIST VALIDATION */}

                <Form.ErrorList errors={errors} />

                {/* ADD ITEM BUTTON */}

                <Button
                  type="dashed"
                  size="large"
                  block
                  icon={<PlusOutlined />}
                  onClick={() =>
                    add({
                      quantity: 1,
                      unitPrice: 0,
                    })
                  }
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  Add Another Garment
                </Button>
              </>
            )}
          </Form.List>

          {/* GARMENT SUBTOTAL */}

          <Row justify="end">
            <Col xs={24} sm={12} md={8} lg={6}>
              <div
                style={{
                  padding: 16,
                  background: "#f5f7fb",
                  borderRadius: 8,
                }}
              >
                <Text type="secondary">
                  Subtotal ({orderItems.length} items)
                </Text>

                <Title
                  level={3}
                  style={{
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  Rs. {formatCurrency(subtotal)}
                </Title>
              </div>
            </Col>
          </Row>
        </Card>

        {/* ============================================================
            ORDER SUMMARY
        ============================================================ */}

        <Card
          title="Order Summary"
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Row gutter={16}>
            {/* SUBTOTAL */}

            <Col xs={24} md={8}>
              <Form.Item label="Subtotal (Rs.)">
                <Input size="large" value={formatCurrency(subtotal)} readOnly />
              </Form.Item>
            </Col>

            {/* DISCOUNT */}

            <Col xs={24} md={8}>
              <Form.Item
                label="Discount (Rs.)"
                name="discount"
                dependencies={["orderItems"]}
                rules={[
                  {
                    type: "number",
                    min: 0,
                    message: "Discount cannot be negative.",
                  },
                  {
                    validator: (_, value) => {
                      const currentItems =
                        form.getFieldValue("orderItems") || [];

                      const currentSubtotal = calculateSubtotal(currentItems);

                      if (value == null || Number(value) <= currentSubtotal) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Discount cannot exceed the subtotal."),
                      );
                    },
                  },
                ]}
                hasFeedback
              >
                <InputNumber
                  size="large"
                  min={0}
                  max={subtotal}
                  precision={2}
                  style={{ width: "100%" }}
                  placeholder="Enter discount"
                />
              </Form.Item>
            </Col>

            {/* GRAND TOTAL */}

            <Col xs={24} md={8}>
              <Form.Item label="Grand Total (Rs.)">
                <Input
                  size="large"
                  value={formatCurrency(grandTotal)}
                  readOnly
                  style={{
                    fontWeight: 600,
                    background: "#f0f5ff",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* ============================================================
            PAYMENT INFORMATION
        ============================================================ */}

        <Card
          title="Payment Information"
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Row gutter={16}>
            {/* PAYMENT METHOD */}

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
                    {
                      value: "bank-transfer",
                      label: "Bank Transfer",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            {/* ADVANCE PAYMENT */}

            <Col xs={24} md={8}>
              <Form.Item
                label="Advance Payment (Rs.)"
                name="advancePayment"
                dependencies={["discount", "orderItems"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter the advance payment.",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Advance payment cannot be negative.",
                  },
                  {
                    validator: (_, value) => {
                      const currentItems =
                        form.getFieldValue("orderItems") || [];

                      const currentSubtotal = calculateSubtotal(currentItems);

                      const currentDiscount =
                        Number(form.getFieldValue("discount")) || 0;

                      const currentGrandTotal = Math.max(
                        0,
                        currentSubtotal - currentDiscount,
                      );

                      if (value == null || Number(value) <= currentGrandTotal) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Payment cannot exceed the grand total."),
                      );
                    },
                  },
                ]}
                hasFeedback
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

            {/* BALANCE DUE */}

            <Col xs={24} md={8}>
              <Form.Item label="Balance Due (Rs.)">
                <Input
                  size="large"
                  value={formatCurrency(balanceDue)}
                  readOnly
                  style={{
                    fontWeight: 600,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* PAYMENT STATUS */}

          <div
            style={{
              marginTop: 8,
              padding: 16,
              background: "#f5f7fb",
              borderRadius: 8,
            }}
          >
            <Text type="secondary">Payment Status</Text>

            <Title
              level={4}
              style={{
                margin: "8px 0 0",
              }}
            >
              {paymentStatus}
            </Title>
          </div>
        </Card>

        {/* ============================================================
            ORDER NOTES
        ============================================================ */}

        <Card
          title="Order Notes"
          style={{
            border: "1px solid #D4AF37",
            borderRadius: 8,
            marginTop: 16,
          }}
        >
          <Form.Item label="Special Instructions" name="notes">
            <Input.TextArea
              rows={4}
              maxLength={500}
              showCount
              placeholder="Enter special instructions for this order..."
            />
          </Form.Item>
        </Card>

        {/* ============================================================
            FORM ACTIONS
        ============================================================ */}

        <Space
          size="middle"
          style={{
            marginTop: 24,
            marginBottom: 24,
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Popconfirm
            title="Reset this order form?"
            description="All entered information will be cleared."
            okText="Yes, Reset"
            cancelText="Cancel"
            onConfirm={() => {
              form.resetFields();

              message.success("Form has been reset.");
            }}
          >
            <Button size="large">Reset Form</Button>
          </Popconfirm>

          <Button type="primary" htmlType="submit" size="large">
            Save Order
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default CreateOrder;
