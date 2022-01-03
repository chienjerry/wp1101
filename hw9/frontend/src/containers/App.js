import React, { useEffect, useState } from "react";
import ChatRoom from "./ChatRoom";
import styled from "styled-components";
import { message, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
const LOCAL_STORAGE_KEY = "chat-app";
const PageHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    margin: 0;
    font-size: 3em;
    margin-right: 20px;
  }
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const DisplayStatus = ({ type, msg }) => {
  if (msg) {
    const StatusContent = { content: msg, duration: 3 };
    switch (type) {
      case "success":
        message.success(StatusContent);
        break;
      case "info":
        message.info(StatusContent);
        break;
      case "error":
      default:
        message.error(StatusContent);
        break;
    }
  }
};
const LoginPage = ({ me, setMe, setSignedIn }) => {
  return (
    <PageWrapper>
      <PageHead>
        <h1>Chat Room</h1>
      </PageHead>
      <Input.Search
        prefix={<UserOutlined />}
        value={me}
        placeholder="Enter your name"
        enterButton="Sign In"
        size="large"
        style={{ width: "300px", margin: "50px" }}
        onChange={(e) => setMe(e.target.value)}
        onSearch={(e) => {
          if (!e) {
            DisplayStatus({
              type: "error",
              msg: "Missing user name",
            });
            return;
          }
          setSignedIn(true);
        }}
      />
    </PageWrapper>
  );
};
const App = () => {
  const SaveMyName = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [MyName, setMyName] = useState("" || SaveMyName);
  const [Login, setLogin] = useState(false);
  useEffect(() => {
    if (Login) {
      localStorage.setItem(LOCAL_STORAGE_KEY, MyName);
    }
  }, [Login, MyName]);
  return Login ? (
    <ChatRoom me={MyName} />
  ) : (
    <LoginPage me={MyName} setSignedIn={setLogin} setMe={setMyName} />
  );
};
export default App;
