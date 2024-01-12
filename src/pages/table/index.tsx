import React, { useState, useEffect } from "react";
import { Table, Space, Modal, Form, Input, Button, Popconfirm } from "antd";
import { useRouter } from "next/router";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  useGetTodosQuery,
  Todo,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "../store/api";

interface DataItem {
  id: number;
  title: string;
  key: number;
}

const TablePage: React.FC = () => {
  const { data: todos = [], isLoading, isError, refetch } = useGetTodosQuery();
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const [forceUpdate, setForceUpdate] = useState(0);
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const [addTodoForm] = Form.useForm();
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const addTodoMutation = useAddTodoMutation();

  useEffect(() => {
    if (forceUpdate > 0) {
      refetch();
      setForceUpdate(0);
    }
  }, [forceUpdate, refetch]);

  useEffect(() => {
    setData(todos.map((todo) => ({ ...todo, key: todo.id })));
  }, [todos]);

  const handleEdit = (record: DataItem) => {
    form.setFieldsValue({ todo: record.title });
    setSelectedItem(record);
    setVisible(true);
  };

  const handleUpdate = async () => {
    try {
      if (selectedItem) {
        const updatedData = data.map((item) =>
          item.id === selectedItem.id
            ? { ...item, title: form.getFieldValue("todo") }
            : item
        );
        setData(updatedData);

        const response = await fetch(
          `https://dummyjson.com/todos/${selectedItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: form.getFieldValue("todo") }),
          }
        );

        if (response.ok) {
          console.log("Todo updated successfully");
        } else {
          refetch();
          console.error(
            `Error updating todo. Server response: ${response.statusText}`
          );
        }

        await refetch();
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setVisible(false);
      setSelectedItem(null);
    }
  };

  const handleDelete = async (record: DataItem) => {
    try {
      const updatedData = data.filter((item) => item.id !== record.id);
      setData(updatedData);

      const response = await fetch(`https://dummyjson.com/todos/${record.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Todo deleted successfully");
      } else {
        refetch();
        console.error(
          `Error deleting todo. Server response: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      refetch();
    }
  };

  const handleAddTodo = async () => {
    try {
      await addTodoForm.validateFields();

      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: addTodoForm.getFieldValue("todo"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Todo added successfully", data);
      } else {
        console.error("Error adding todo:", data);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setAddTodoVisible(false);
      addTodoForm.resetFields();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "To Do",
      dataIndex: "todo",
      key: "todo",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: DataItem) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record)}
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
        <Button
          type="primary"
          onClick={() => setAddTodoVisible(true)}
          style={{ width: "100px" }}
        >
          Add
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error fetching quotes</div>
      ) : (
        <Table
          dataSource={todos.map((todo) => ({ ...todo, key: todo.id }))}
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
        title="Edit Todo"
        open={visible}
        onOk={handleUpdate}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ todo: "" }}>
          <Form.Item label="Todo" name="todo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Todo"
        open={addTodoVisible}
        onOk={handleAddTodo}
        onCancel={() => setAddTodoVisible(false)}
      >
        <Form form={addTodoForm} layout="vertical" initialValues={{ todo: "" }}>
          <Form.Item
            label="Todo"
            name="todo"
            rules={[{ required: true, message: "Please input your todo!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TablePage;
