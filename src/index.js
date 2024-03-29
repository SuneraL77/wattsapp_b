import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";
import SocketServer from "../SocketServer.js";
//create express app

const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error:${err}`);
  process.exit(1);
});

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  });
let server;

server = app.listen(PORT, () => {
  logger.info(`server is listening at ${PORT}`);
 
  console.log("process => id", process.pid);
});

// soket io
const io = new Server(server, {
  pingTimeout: 600000,
  cors: {
    origin:process.env.CLIENT_ENDPOINT,
  },
});
io.on("connection",(socket) => {
  logger.info("soket io connected successfuly");
  SocketServer(socket)
});

//handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexprctdErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexprctdErrorHandler);
process.on("unhandledRejection", unexprctdErrorHandler);
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server Closed");
    process.exit(1);
  }
});
