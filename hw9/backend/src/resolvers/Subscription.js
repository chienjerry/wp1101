import { withFilter } from "graphql-yoga";
const Subscription = {
  createMessage: {
    subscribe(parent, args, context) {
      return withFilter(
        () => context.pubsub.asyncIterator("createMessage"),
        (
          {
            createMessage: {
              chatRoom: { name1, name2 },
              message,
            },
          },
          { chatRoom: clientChatRoom } 
        ) => {
          return (
            name1 === clientChatRoom.name1 && name2 === clientChatRoom.name2
          );
        }
      )(parent, args, context);
    },
  },
  clearMessages: {
    subscribe(parent, args, context) {
      return withFilter(
        () => context.pubsub.asyncIterator("clearMessages"),
        (
          { clearMessages: { name1, name2 } },
          { chatRoom: clientChatRoom } 
        ) => {
          return (
            name1 === clientChatRoom.name1 && name2 === clientChatRoom.name2
          );
        }
      )(parent, args, context);
    },
  },
};

export default Subscription;
