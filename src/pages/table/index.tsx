import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetQuotesQuery, Quote } from "../store/api";

interface DataItem extends Quote {
  key: string;
}

const TablePage: React.FC = () => {
  const router = useRouter();
  const { data: quotes = [], isLoading, isError } = useGetQuotesQuery();
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    try {
      const slicedQuotes = quotes.slice(0, 3);
      const mappedQuotes = slicedQuotes.map((quote, index) => ({
        ...quote,
        key: quote.id || index.toString(),
      }));

      setData(mappedQuotes);
    } catch (error) {
      console.error("Error mapping quotes:", error);
    }
  }, [quotes]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: { author: string; content: string }) => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id: string) => {
    router.reload();
  };

  const handleUpdate = (id: string) => {
    console.log(`Update item with id: ${id}`);
  };

  const handleAdd = () => {
    router.push("/add-content");
  };

  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Quote",
      dataIndex: "quote",
      key: "quote",
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
          />
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record.key)}
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

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching quotes</div>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          style={{
            maxWidth: "100%",
            overflowX: "auto",
          }}
        />
      )}

      <Modal
        title="Add Content"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="addContent" onFinish={onFinish}>
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quote"
            name="content"
            rules={[{ required: true, message: "Please input the quote!" }]}
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

export default TablePage;
