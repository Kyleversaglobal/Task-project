import React from "react";
import { Button, Checkbox, Form, Input, Typography, Row, Col } from "antd";
import { useRouter } from "next/router";
import { useAddUserMutation } from "../store/api";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  remember?: boolean;
};
const { Title } = Typography;
const SignupPage: React.FC = () => {
  const router = useRouter();
  const [addUser, { isError, error }] = useAddUserMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await addUser({
        username: values.username,
        email: values.email,
        password: values.password,
      }).unwrap();

      console.log("User registered successfully:", response);
      router.push("/login");
    } catch (err) {
      console.error("User registration failed:", err);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Form
          name="signup"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          style={{
            width: "100%",
            maxWidth: 500,
            border: "1px solid #e8e8e8",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Sign Up
          </Title>

          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sign Up
            </Button>
            <p style={{ marginTop: 16, textAlign: "center" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={handleLoginClick}
              >
                Login now!
              </span>
            </p>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupPage;
