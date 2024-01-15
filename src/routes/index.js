import express from "express";
import authRoutes from './auth.rotue.js'
import userRoutes from './user.route.js'
import ConversationRoutes from "./conversation.route.js";
import MessageRoutes from "./message.route.js"
const router = express.Router();


router.use("/auth", authRoutes);
router.use("/conversation", ConversationRoutes);
router.use("/message",MessageRoutes);
router.use("/user",userRoutes );
export default router;