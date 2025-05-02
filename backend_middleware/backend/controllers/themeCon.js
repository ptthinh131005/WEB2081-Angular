const { theme, author } = require("../model/model");
const themeCon = {
  // add
  addTheme: async (req, res) => {
    try {
      const newTheme = new theme(req.body);
      const saveTheme = await newTheme.save();
      if (req.body.author) {
        const authorData = await author.findById(req.body.author);
        if (authorData) {
          authorData.theme.push(saveTheme._id);
          await authorData.save();
        } else {
          // Xử lý trường hợp không tìm thấy tác giả
        }
      }
      res.status(200).json(saveTheme);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllTheme: async (req, res) => {
    try {
      const themes = await theme.find();
      res.status(200).json(themes);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // getAnTheme: async (req, res) => {
  //   try {
  //     const au = await theme.findById(req.params.id).populate("author");
  //     res.status(200).json(au);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
  updateTheme: async (req, res) => {
    try {
      const themeToUpdate = await theme.findById(req.params.id);
      await themeToUpdate.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTheme: async (req, res) => {
    try {
      // Xóa tham chiếu đến theme trong author
      await author.updateMany(
        { theme: req.params.id },
        { $pull: { theme: req.params.id } }
      );

      // Xóa theme theo ID
      await theme.findByIdAndDelete(req.params.id);

      res.status(200).json("Xóa thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = themeCon;
