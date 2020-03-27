import mongoose from "mongoose";
import Convo from "../models/convo";

const _repo = mongoose.model("Convo", Convo);
class ConvoService {
  getAll() {
    throw new Error("Method not implemented.");
  }
  getById(getById) {
    throw new Error("Method not implemented.");
  }
  create(body) {
    throw new Error("Method not implemented.");
  }
  edit(id, body) {
    throw new Error("Method not implemented.");
  }
  delete(id) {
    throw new Error("Method not implemented.");
  }
}

const convoService = new ConvoService();
export default convoService;
