import logger from "../configs/logger.config.js";
import createHttpError from 'http-errors';
import { createConversation, doesConversationExist, getUserConversation, populateConversation } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";
export const create_open_conversation = async (req,res,next) =>{
    try{
        const sender_id = req.user.userId;
        const {recever_id} = req.body
        console.log(recever_id)
if(!recever_id){
    logger.error(
        "Please provide the user id you wanna start a convercation with !"
    );
    throw createHttpError.BadGateway("Somthing went wrong !")
}
//check if  chet exists
const exited_conversation = await doesConversationExist(
    sender_id,
    recever_id
)
if(exited_conversation){
    res.json(exited_conversation)
}else{
  
let receiver_user = await findUser(recever_id);

let convoData = {
    name:receiver_user.name,
    picture:receiver_user.picture,
    isGroup:false,
    users:[sender_id,recever_id]
}
const newConvo = await createConversation(convoData);

const populatedConvo = await populateConversation(
    newConvo._id,
    "users",
    "-password"
)
res.status(200).json(populatedConvo)

}
console.log("hello from convo ")
    }catch(error){
        next(error)
    }
}

export const getConversations = async (req,res,next) =>{
    try{
const user_id = req.user.userId;
console.log(user_id)
const conversations = await getUserConversation(user_id)
res.status(200).json(conversations)
    }catch(err){

        next();
    }
}