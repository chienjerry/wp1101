import mongoose from "mongoose";
const Message = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
  },
  body: {
    type: String,
    required: [true, "Body field is required."],
  },
});
const ChatRoom = new mongoose.Schema({
  name1: {
    type: String,
    required: [true, "name1 field is required."],
  },
  name2: {
    type: String,
    required: [true, "name2 field is required."],
  },
  messages: {
    type: [Message],
    required: [true, "messages field is required."],
  },
});
const ChatRoomSchema = mongoose.model("ChatRoom", ChatRoom);
export default ChatRoomSchema;
