import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema.Types;

const ConversationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Conversation is required"],
        trim:true,
    },
    isGroup:{
        type:Boolean,
        required:true,
        default:false,
    },
    users:[
        {
            type:ObjectId,
            ref:"UserModel",
        },
    ],
    latestMessage:{
        type:ObjectId,
        ref:"MessageModel",
    },
    admin:{
        type:ObjectId,
        ref:"user"
    }
},{
    collection:"conversations",
    timestamps:true,
})

const ConversationModel = mongoose.models.ConversationModel || mongoose.model("ConversationModel",ConversationSchema)

export default ConversationModel