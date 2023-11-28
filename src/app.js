import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from  "cookie-parser";
import compression from "compression"
import fileUpload from "express-fileupload"
import cros from "cors"
const app = express();

app.use(helmet());


app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(mongoSanitize());

app.use(cookieParser());

app.use(compression());

app.use(
    fileUpload({
        useTempFiles:true
    })
)


app.use(cros())


dotenv.config();
if(process.env.NODE_ENV !== "production"){

    app.use(morgan("dev"));
}
export default app
