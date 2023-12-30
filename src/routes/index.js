import express from "express";
import authRoutes from './auth.rotue.js'
const router = express.Router();


router.use("/auth", authRoutes)
export default router;