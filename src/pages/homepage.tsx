import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div style={{ textAlign: "center", paddingTop: 100 }}>
      <h1>Welcome to Your Next.js Landing Page</h1>
      <p>Explore and join us!</p>
      <Button type="primary" size="large" onClick={handleLoginClick}>
        Join
      </Button>
    </div>
  );
};

export default HomePage;
