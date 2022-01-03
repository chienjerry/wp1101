import uuidv4 from "uuid/v4";
import {
  makeName,
  checkUser,
  checkChatBox,
  newUser,
  newChatBox,
  checkMessage,
  newMessage,
} from "./utility";
import ChatRoomSchema from "../../models/message.js";
const Mutation = {
  async createMessage(parent, args, { pubsub }, info) {
    const { chatRoom, message } = args;
    try {
      let FindChatRoom = await ChatRoomSchema.findOne({
        name1: chatRoom.name1,
        name2: chatRoom.name2,
      });
      if (!FindChatRoom) {
        if (chatRoom.name1 > chatRoom.name2) {
          return;
        }
        FindChatRoom = new ChatRoomSchema(chatRoom);
        await FindChatRoom.save();
      }
      await FindChatRoom.updateOne({
        $push: {
          messages: {
            $each: [message],
            $sort: { created_at: -1 },
          },
        },
      });
      pubsub.publish("createMessage", {
        createMessage: args,
      });
      return args;
    } catch (e) {
      return;
    }
  },
  async clearMessages(parent, { chatRoom }, { pubsub }, info) {
    try {
      const FindChatRoom = await ChatRoomSchema.findOne({
        name1: chatRoom.name1,
        name2: chatRoom.name2,
      });
      if (!FindChatRoom) {
        FindChatRoom = new ChatRoomSchema(chatRoom);
      }
      await FindChatRoom.updateOne({ messages: [] });
      pubsub.publish("clearMessages", {
        clearMessages: chatRoom,
      });
      return FindChatRoom;
    } catch (e) {
      return;
    }
  },
};
export default Mutation;
