import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from  "cookie-parser";
import compression from "compression"
import fileUpload from "express-fileupload"
import cros from "cors";
import createHttpError from 'http-errors'
import router from "./routes/index.js";
const app = express();

app.use(helmet());


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(mongoSanitize());

app.use(cookieParser());

app.use(compression());
app.use(morgan("dev"));
app.use(
    fileUpload({
        useTempFiles:true
    })
)


app.use(cros())

app.use("/api/v1",router);

app.use(async (req,res,next) =>{
    next(createHttpError.NotFound("This route does not exit"))
})

app.use(async (err,req,res,next) =>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
})

dotenv.config();
if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}
export default app
