
import app from "./app.js";
import dotenv from "dotenv"

//dotEnv config
dotenv.config();

//create express app



const PORT = process.env.PORT ||8000;

app.listen(PORT, () =>{
    console.log(`server is listening at ${PORT}`)
})