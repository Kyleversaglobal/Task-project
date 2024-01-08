import React from "react";
import { useState } from "react";
import { Table, Space, Modal, Form, Input, Button, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataItem {
  key: number;
  title: string;
  content: string;
}

const HomePage: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<DataItem[]>([
    {
      key: 1,
      title: "Lorem ipsum dolor.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue sit amet mauris ac pulvinar. Nam luctus, leo non venenatis tristique, massa diam aliquam sapien, vitae congue arcu elit nec purus. Nam finibus iaculis lectus, id convallis augue mattis ac. Nunc id lobortis velit, vel imperdiet odio.",
    },
    {
      key: 2,
      title: "Lorem ipsum dolor sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue sit amet mauris ac pulvinar. Nam luctus, leo non venenatis tristique, massa diam aliquam sapien, vitae congue arcu elit nec purus. Nam finibus iaculis lectus, id convallis augue mattis ac. Nunc id lobortis velit, vel imperdiet odio.",
    },
    {
      key: 3,
      title: "Lorem ipsum dolor sit.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue sit amet mauris ac pulvinar. Nam luctus, leo non venenatis tristique, massa diam aliquam sapien, vitae congue arcu elit nec purus. Nam finibus iaculis lectus, id convallis augue mattis ac. Nunc id lobortis velit, vel imperdiet odio.",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: { title: string; content: string }) => {
    const newData: DataItem[] = [
      ...data,
      {
        key: data.length + 1,
        title: values.title,
        content: values.content,
      },
    ];
    setData(newData);
    setIsModalVisible(false);
  };

  const handleDelete = (key: number) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleUpdate = (key: number) => {
    console.log(`Update item with key: ${key}`);
  };

  const handleAdd = () => {
    router.push("/add-content");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: DataItem) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record.key)}
          ></Button>
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => {
              handleDelete(record.key);
              router.reload();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="default" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          marginBottom: "16px",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <Button type="primary" onClick={showModal} style={{ width: "100px" }}>
          Add
        </Button>
      </div>
      <Table<DataItem>
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 5 }}
        bordered
        style={{
          maxWidth: "100%",
          overflowX: "auto",
        }}
      />

      <Modal
        title="Add Content"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="addContent" onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input the content!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              type="default"
              onClick={handleCancel}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
