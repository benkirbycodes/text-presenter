import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Message = new Schema({
  role: { type: String, enum: ["Bot", "User"] },
  text: { type: String }
});

const Convo = new Schema(
  {
    title: { type: String, required: true },
    id: { type: ObjectId },
    messages: [Message]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Convo;
