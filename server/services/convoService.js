import mongoose from "mongoose";
import Convo from "../models/convo";

const _repo = mongoose.model("Convo", Convo);
class ConvoService {
  async getAll() {
    return await _repo.find();
  }
  async getById(id) {
    let data = await _repo.findOne({ _id: id });
    if (!data) {
      throw new Error("Invalid ID");
    }
    return data;
  }
  async create(newConvo) {
    try {
      return await _repo.create(newConvo);
    } catch (error) {
      console.error(error);
    }
  }
  async edit(id, update) {
    let data = await _repo.findOneAndUpdate({ _id: id }, update, { new: true });
    if (!data) {
      throw new Error("Invalid ID");
    }
    return data;
  }
  async delete(id) {
    let data = await _repo.findOneAndRemove({ _id: id });
    if (!data) {
      throw new Error("Invalid ID");
    }
    return data;
  }
}

const convoService = new ConvoService();
export default convoService;
