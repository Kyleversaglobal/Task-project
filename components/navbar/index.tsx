import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Header } = Layout;

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogoutButtonClick = () => {
    console.log("Logout button clicked");

    router.push("/login");
  };

  return (
    <Header>
      <div className="logo" />
      <div style={{ float: "right" }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogoutButtonClick}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default NavBar;
