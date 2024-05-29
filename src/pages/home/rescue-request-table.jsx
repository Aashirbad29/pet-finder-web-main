import React, { useState } from "react";
import { Button, Form, Input, message, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../utils/axios";

const RescueRequestTable = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newRequest) => axiosInstance.post("/rescues", newRequest),
    onSuccess: () => {
      message.success("Rescue request created successfully");
      form.resetFields();
      queryClient.invalidateQueries("myRescues");
    },
    onError: (error) => {
      message.error(error.response.data?.msg || "Error creating rescue request");
    },
  });

  const columns = [
    {
      title: "Requested By",
      key: "requestedBy",
      render: (data) => (
        <>
          <p>Name: {data?.user_id.name}</p>
          <p>Email: {data?.user_id.email}</p>
          <p>
            Contact: {data?.user_id.address}, {data?.user_id.phone_number}
          </p>
        </>
      ),
    },
    {
      title: "Pet Details",
      dataIndex: "pet_details",
      key: "pet_details",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
  ];

  const { data, isLoading } = useQuery("myRescues", () => axiosInstance.get("/rescues/my-rescues"), { initialData: [] });

  const onFinish = (values) => {
    createMutation.mutate(values);
  };

  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical" style={{ marginBottom: 24 }}>
        <Form.Item name="pet_details" label="Pet Details" rules={[{ required: true, message: "Please enter pet details" }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={createMutation.isLoading}>
          Submit Rescue Request
        </Button>
      </Form>

      <Table loading={isLoading} bordered columns={columns} dataSource={data?.data?.result} rowKey="_id" />
    </>
  );
};

export default RescueRequestTable;
