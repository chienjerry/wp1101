import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import { Button, Input, message, Tabs, Tag, Modal } from "antd";
const { TabPane } = Tabs;
const SUBSCRIPTION_CREATE_MESSAGE = gql`
  subscription CreateMessage($chatRoom: ChatRoomInput!) {
    createMessage(chatRoom: $chatRoom) {
      chatRoom {
        name1
        name2
      }
      message {
        name
        body
      }
    }
  }
`;
const SUBSCRIPTION_CLEAR_MESSAGES = gql`
  subscription ClearMessages($chatRoom: ChatRoomInput!) {
    clearMessages(chatRoom: $chatRoom) {
      name1
      name2
    }
  }
`;
const QUERY_MESSAGES = gql`
  query Messages($chatRoom: ChatRoomInput!, $count: Int!) {
    messages(chatRoom: $chatRoom, count: $count) {
      name
      body
    }
  }
`;
const MUTATION_CREATE_MESSAGE = gql`
  mutation createMessage($chatRoom: ChatRoomInput!, $message: MessageInput!) {
    createMessage(chatRoom: $chatRoom, message: $message) {
      chatRoom {
        name1
        name2
      }
      message {
        name
        body
      }
    }
  }
`;
const MUTATION_CLEAR_MESSAGES = gql`
  mutation ClearMessages($chatRoom: ChatRoomInput!) {
    clearMessages(chatRoom: $chatRoom) {
      name1
      name2
    }
  }
`;
const PageTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const Messages = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;
const ChatModel = ({ visible, handleOk, handleCancel }) => {
  const [Name, setName] = useState("");
  return (
    <Modal
      title="To start chat with?"
      visible={visible}
      onOk={() => {
        handleOk(Name);
      }}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Please Enter user name."
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};
const ChatBox = ({ me, you }) => {
  const [name1, name2] = (() => {
    return me <= you ? [me, you] : [you, me];
  })();
  const name1Andname2 = { name1, name2 };
  const { loading, error, data, subscribeToMore } = useQuery(QUERY_MESSAGES, {
    variables: { chatRoom: name1Andname2, count: 200 },
  });
  useEffect(() => {
    try {
      const Unsubscribe = subscribeToMore({
        document: SUBSCRIPTION_CREATE_MESSAGE,
        variables: { chatRoom: name1Andname2 },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          DisplayStatus({
            type: "success",
            msg: "Message sent.",
          });
          const newMessage = subscriptionData.data.createMessage.message;
          if (prev.messages === null) {
            return {
              messages: [newMessage],
            };
          }
          return {
            messages: [...prev.messages, newMessage],
          };
        },
      });
      return () => Unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      const Unsubscribe = subscribeToMore({
        document: SUBSCRIPTION_CLEAR_MESSAGES,
        variables: { chatRoom: name1Andname2 },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          DisplayStatus({
            type: "info",
            msg: "Message have been  cleared.",
          });
          return {
            messages: [],
          };
        },
      });
      return () => Unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return loading ? (
    <div>Now loading...</div>
  ) : (
    <Messages>
      {error ? (
        <p style={{ color: "#f44" }}>Some error happens...</p>
      ) : data.messages ? (
        data.messages.map(({ name, body }, j) => {
          if (name === me) {
            return (
              <p
                className="App-message-mine"
                key={j}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <span style={{ margin: "0 8px 0 0" }}>{body}</span>
                <Tag color="blue">{name}</Tag>
              </p>
            );
          }
          return (
            <p
              className="App-message-yours"
              key={j}
              style={{ display: "flex" }}
            >
              <Tag color="blue">{name}</Tag>
              {body}
            </p>
          );
        })
      ) : (
        <p style={{ color: "#ccc" }}>Can't find any message here...</p>
      )}
    </Messages>
  );
};
export default function ChatRoom({ me }) {
  const [ActiveKey, setActiveKey] = useState();
  const [Panes, setPanes] = useState([]);
  const [ChatModalVisible, setChatModalVisible] = useState(false);
  const [Body, setBody] = useState("");
  const NewRef = useRef(0);
  const useChatBox = () => {
    const [ChatBoxes, setChatBoxes] = useState([]);
    const CreateChatBox = (p) => {
      setChatBoxes((c) => [...c, p]);
    };
    const RemoveChatBox = (p) => {
      setChatBoxes((c) => c.filter((e) => e !== p));
    };
    return {
      chatBoxes: ChatBoxes,
      createChatBox: CreateChatBox,
      removeChatBox: RemoveChatBox,
    };
  };
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [Mutation_Create_Message] = useMutation(MUTATION_CREATE_MESSAGE);
  const [Mutation_Clear_Messages] = useMutation(MUTATION_CLEAR_MESSAGES);
  const AddPane = (e) => {
    const CurrentKey = `newTab${NewRef.current}`;
    NewRef.current++;
    const newPanes = [
      ...Panes,
      {
        title: e,
        key: CurrentKey,
      },
    ];
    setActiveKey(CurrentKey);
    setPanes(newPanes);
    createChatBox(e);
  };
  const RemovePane = (e) => {
    let NewKey = ActiveKey;
    let FinalInd;
    Panes.forEach((p, i) => {
      if (p.key === e) {
        FinalInd = i - 1;
      }
    });
    const RemoveTitle = Panes.find((p) => p.key === e).title;
    const NewPanes = Panes.filter((p) => p.key !== e);
    if (NewPanes.length && NewKey === e) {
      if (FinalInd >= 0) {
        NewKey = NewPanes[FinalInd].key;
      } else {
        NewKey = NewPanes[0].key;
      }
    }
    setActiveKey(NewKey);
    setPanes(NewPanes);
    removeChatBox(RemoveTitle);
  };
  const EditPane = (Goal, NowToDo) => {
    if (NowToDo === "add") {
      setChatModalVisible(true);
    } else if (NowToDo === "remove") {
      RemovePane(Goal);
    }
  };
  const SendOneMessage = (msg) => {
    const you = Panes.find((p) => p.key === ActiveKey).title;
    const [name1, name2] = (() => {
      return me <= you ? [me, you] : [you, me];
    })();
    Mutation_Create_Message({
      variables: {
        chatRoom: { name1, name2 },
        message: { name: me, body: msg },
      },
    });
  };
  const handleCancelChatModel = () => {
    setChatModalVisible(false);
  };
  const handleOnChange = (e) => {
    setActiveKey(e);
  };
  const handleChatModalok = (e) => {
    AddPane(e);
    setChatModalVisible(false);
  };
  const ClearMessages = () => {
    const you = Panes.find((p) => p.key === ActiveKey).title;
    const [name1, name2] = (() => {
      return me <= you ? [me, you] : [you, me];
    })();
    Mutation_Clear_Messages({
      variables: {
        chatRoom: { name1, name2 },
      },
    });
  };
  useEffect(() => {
    if (chatBoxes.length === 0) {
      AddPane(me);
    }
  }, [chatBoxes, me]);
  return (
    <PageWrapper>
      <PageTitle>
        <h1>{me}'s chat room</h1>
        <Button type="primary" danger onClick={ClearMessages}>
          Clear
        </Button>
      </PageTitle>
      <Tabs
        type="editable-card"
        onChange={handleOnChange}
        activeKey={ActiveKey}
        onEdit={EditPane}
        style={{ width: "100%" }}
      >
        {Panes.map((p) => (
          <TabPane tab={p.title} key={p.key} closable={p.closable}>
            <ChatBox me={me} you={p.title} key={p.key} />
          </TabPane>
        ))}
      </Tabs>
      <Input.Search
        enterButton="Send"
        placeholder="You can type something here..."
        value={Body}
        onChange={(e) => setBody(e.target.value)}
        onSearch={(msg) => {
          if (!msg || !me) {
            DisplayStatus({
              type: "error",
              msg: "Empty input!!!",
            });
            return;
          }
          SendOneMessage(msg);
          setBody("");
        }}
      />
      <ChatModel
        visible={ChatModalVisible}
        handleOk={handleChatModalok}
        handleCancel={handleCancelChatModel}
      />
    </PageWrapper>
  );
}

