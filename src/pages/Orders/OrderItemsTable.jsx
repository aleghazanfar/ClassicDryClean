import React from "react";

import {
  Form,
  InputNumber,
  Select,
  Button,
  Card,
  Row,
  Col,
  Space,
  Typography,
  Popconfirm,
} from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const OrderItemsTable = () => {
  return (
    <Card
      title="Order Items"
      extra={
        <Text type="secondary">Add garments and services to this order</Text>
      }
      style={{ marginTop: 16 }}
    >
      <Form.List
        name="orderItems"
        rules={[
          {
            validator: async (_, items) => {
              if (!items || items.length === 0) {
                throw new Error("Please add at least one order item.");
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Card
                key={field.key}
                size="small"
                title={`Item ${index + 1}`}
                style={{ marginBottom: 16 }}
                extra={
                  <Popconfirm
                    title="Remove this item?"
                    description="This item will be removed from the order."
                    okText="Remove"
                    cancelText="Cancel"
                    onConfirm={() => remove(field.name)}
                  >
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      aria-label={`Remove item ${index + 1}`}
                    />
                  </Popconfirm>
                }
              >
                <Row gutter={[16, 12]}>
                  {/* Type */}
                  <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                      label="Type"
                      name={[field.name, "typeId"]}
                      rules={[
                        {
                          required: true,
                          message: "Select a type.",
                        },
                      ]}
                    >
                      <Select placeholder="Select type" options={[]} />
                    </Form.Item>
                  </Col>

                  {/* Article */}
                  <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                      label="Article"
                      name={[field.name, "articleId"]}
                      rules={[
                        {
                          required: true,
                          message: "Select an article.",
                        },
                      ]}
                    >
                      <Select placeholder="Select article" options={[]} />
                    </Form.Item>
                  </Col>

                  {/* Service */}
                  <Col xs={24} sm={12} lg={4}>
                    <Form.Item
                      label="Service Name"
                      name={[field.name, "serviceId"]}
                      rules={[
                        {
                          required: true,
                          message: "Select a service.",
                        },
                      ]}
                    >
                      <Select placeholder="Select service" options={[]} />
                    </Form.Item>
                  </Col>

                  {/* Unit */}
                  <Col xs={24} sm={12} lg={3}>
                    <Form.Item
                      label="Unit"
                      name={[field.name, "unit"]}
                      rules={[
                        {
                          required: true,
                          message: "Select a unit.",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Unit"
                        options={[
                          {
                            label: "Piece",
                            value: "Piece",
                          },
                          {
                            label: "Pair",
                            value: "Pair",
                          },
                          {
                            label: "Set",
                            value: "Set",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  {/* Quantity */}
                  <Col xs={12} sm={6} lg={2}>
                    <Form.Item
                      label="Qty"
                      name={[field.name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter quantity.",
                        },
                        {
                          type: "number",
                          min: 1,
                          message: "Quantity must be at least 1.",
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        precision={0}
                        placeholder="Qty"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  {/* Price */}
                  <Col xs={12} sm={6} lg={3}>
                    <Form.Item
                      label="Price"
                      name={[field.name, "price"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter price.",
                        },
                        {
                          type: "number",
                          min: 0,
                          message: "Price cannot be negative.",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        precision={2}
                        placeholder="Price"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Form.ErrorList errors={errors} />

            <Space>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() =>
                  add({
                    quantity: 1,
                    price: 0,
                  })
                }
                block
              >
                Add Item
              </Button>
            </Space>
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default OrderItemsTable;
