import ChatRoomSchema from "../../models/message.js";
const Query = {
  async messages(parent, { chatRoom: { name1, name2 }, count }, context, info) {
    try {
      const FindChatRoom = await ChatRoomSchema.findOne({
        name1: name1,
        name2: name2,
      });
      if (!FindChatRoom) {
        return;
      }
      return FindChatRoom.messages.slice(-count);
    } catch (e) {
      return;
    }
  },
};
export default Query;
