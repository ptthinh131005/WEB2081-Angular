const { compare } = require("bcrypt");
const { theme, author,account } = require("../model/model");
const userCon = {
  // add
  getUser: async (req, res) => {
    try {
      const user = await account.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      //chưa xóa theme :(((
      await account.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAnUser: async (req, res) => {
    try {
      const au = await account.findById(req.params.id);
      res.status(200).json(au);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const authorToUpdate = await account.findById(req.params.id);
      await authorToUpdate.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = userCon;
