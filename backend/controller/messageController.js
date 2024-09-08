import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save(); 

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    const recieverSocketId = getRecieverSocketId(receiverId);

    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getMessage = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user._id;
  
      const conversations = await Conversation.find({
        participants: {
          $all: [senderId, userToChatId],
        },
      }).populate("messages");
  
      if (conversations.length === 0) {
        return res.status(404).json({ message: "No conversation found" });
      }
  

      const messages = conversations[0].messages;
  
      res.status(200).json(messages);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export { sendMessage, getMessage };
