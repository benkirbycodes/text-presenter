import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Message = new Schema({
  role: { type: String, required: true },
  text: { type: String, required: true }
});

const Convo = new Schema({
  title: { type: String, required: true },
  id: { type: ObjectId, required: true },
  messages: [Message]
});

export default Convo;
