import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useRouter } from "next/router";
import { useLoginMutation } from "../store/api";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [login, { isLoading, isError }] = useLoginMutation();

  const onFinish = async (values: any) => {
    try {
      const response = await login({
        username: values.username,
        password: values.password,
      }).unwrap();

      console.log("Success:", values);
      console.log("API Response:", response);

      router.push("/table");
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSignupClick = () => {
    router.push("/signup");
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "8px",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h1>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isLoading}
            >
              Log In
            </Button>
          </Form.Item>

          {isError && (
            <div style={{ color: "red", textAlign: "center" }}>
              You have entered an invalid username or password
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleSignupClick}
            >
              Don't have an account? Sign up now!
            </span>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
