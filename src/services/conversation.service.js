import ConversationModel from "../models/ConversationModel.js"
import UserModel from "../models/userModel.js"
import createHttpError from 'http-errors';

export const doesConversationExist  = async (sender_id,recever_id) =>{
    
    let convos = await ConversationModel.find({
        isGroup:false,
        $and: [
            {users:{$elemMatch:{$eq:sender_id}}},
            {users:{$elemMatch:{$eq:recever_id}}}
        ]
    }).populate("users","-password")
    .populate("latestMessage")
    if(!convos) throw createHttpError.BadRequest('Oops...Something went wrong ~')

    convos = await UserModel.populate(
        convos,{
            path:"letestMessage.sender",
            select:"name email picture status"
        }
    )
    return convos[0]
} 

export const createConversation = async(data) =>{
    const newConvo = await ConversationModel.create(data);
    if(!newConvo) throw createHttpError.BadRequest('Oops...Something went wrong ~');
    return newConvo
}

export const populateConversation = async (id,fieldToPopulate,fieldsToRemove) =>{
    const populatedConvo = await ConversationModel.findOne({_id:id}).populate(fieldToPopulate,
        fieldsToRemove);

        if(!populatedConvo) throw createHttpError.BadRequest('Oops...Something went wrong ~');

return populatedConvo
}

export const getUserConversation = async (user_id) =>{
    let conversations
    await ConversationModel.find({
        users:{$elemMatch:{$eq:user_id}},
    }).populate("users","-password")
    .populate("admin","-password")
    .populate("latestMessage")
     .sort({updatedAt:-1})
    .then(async (results) =>{
    results = await UserModel.populate(results,{
        path:"letestMessage.sender",
        select:"name email pocture status"
    })
    conversations = results
    }).catch((err) =>{
        throw createHttpError.BadRequest("Opps..Somthong went wrong")
    })
return conversations
}

export const  updateLatesMessage = async (convo_id,msg) =>{
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id,{
        latestMessage: msg,
    })
    if(!updatedConvo) throw createHttpError.BadRequest("Oops..Something went wrong !")
    return updatedConvo
next()
}