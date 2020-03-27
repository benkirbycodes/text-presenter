import express from "express";
import cors from "cors";
import bp from "body-parser";
import ConvoController from "./controllers/convoController";
import DbContext from "./db/dbConfig";

DbContext.connect();

const port = process.env.PORT || 3000;

let server = express();

server.use(express.static(__dirname + "/../client"));

var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));
server.use(bp.urlencoded({ extended: true }));
server.use(bp.json());

server.use("/api/convos", new ConvoController().router);

server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

server.use((req, res, next) => {
  res.status(404).send("Route not found");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
