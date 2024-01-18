import logger from "../configs/logger.config.js";
import createHttpError from "http-errors";
import {
  createConversation,
  doesConversationExist,
  getUserConversation,
  populateConversation,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";
export const create_open_conversation = async (req, res, next) => { 
  try {
    const sender_id = req.user.userId;
    const { receiver_id } = req.body;
    if (!receiver_id) {
      logger.error(
        "Please provide the user id you wanna start a convercation with !"
      );
      throw createHttpError.BadGateway("Somthing went wrong !");
    }
    //check if  chet exists
    const exited_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );
    if (exited_conversation) {
      res.json(exited_conversation);
    } else {
      let receiver_user1 = await findUser(receiver_id);

      let convoData = {
        name:"conversation name",
        picture: "conversation picture",
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);

      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConvo);
    }
    console.log("hello from convo ");
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversation(user_id);
    res.status(200).json(conversations);
  } catch (err) {
    next();
  }
};
