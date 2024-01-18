import logger from "../configs/logger.config.js";
import { updateLatesMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getConvoMessage,
  populatedMessage,
} from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please Provider a conversation id and a message body");
      return res.sendStaus(400);
    }
    const msgData = {
      sender: user_id,
      message,
      conversation:convo_id,
      files: files || [],
    };
    let newMessage = await createMessage(msgData);

    let populatedMessage1 = await populatedMessage(newMessage._id);
    await updateLatesMessage(convo_id, newMessage);
    res.json(populatedMessage1);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      logger.error("Please add a conversation id in params");
      res.sendStaus(40);
    }

    const message = await getConvoMessage(convo_id);
    res.json(message);
  } catch (error) {
    next(error);
  }
};
