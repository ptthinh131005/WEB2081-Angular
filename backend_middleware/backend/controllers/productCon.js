const { theme, author,product,products } = require("../model/model");
const productCon = {
  // add
  addproduct: async (req, res) => {
    try {
      const newproduct = new product(req.body);
      const saveproduct = await newproduct.save();
      if (req.body.author) {
        const authorData = await author.findById(req.body.author);
        if (authorData) {
          authorData.product.push(saveproduct._id);
          await authorData.save();
        } else {
          // Xử lý trường hợp không tìm thấy tác giả
        }
      }
      res.status(200).json(saveproduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllproduct: async (req, res) => {
    try {
      let limit = 50;
      let products = {};
      let query = req.query;

      // nếu link có query ?category=65f4701c0dea43f70db2df12&keyword=Iphone&limit=5
      if (query && Object.keys(query).length !== 0) {
        const { category, keyword, limit } = query;
        let queries = {};
    
        // Apply keyword query if provided
        if (keyword) {
          /*
          $regex là một toán tử của MongoDB cho phép chúng ta thực hiện tìm kiếm dựa trên biểu thức
          Biểu thức new RegExp(search, 'i') được sử dụng để tạo ra một biểu thức từ chuỗi keyword 
          và cờ 'i' để chỉ định tìm kiếm không phân biệt chữ hoa chữ thường.
          */
          queries.name = { $regex: new RegExp(keyword, 'i') };
        }
    
        // Apply category filter if provided
        if (category) {
          queries.category = category;
        }
        console.log(queries);
        products = await product.find(queries).limit(limit);
        
      } else {
        // select * from products
        // Keyword: MongoBD sheel find
        products = await product.find().limit(limit);
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAnproduct: async (req, res) => {
    try {
      const products = await product.findById(req.params.id);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateproduct: async (req, res) => {
    try {
      const productToUpdate = await product.findById(req.params.id);
      await productToUpdate.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteproduct: async (req, res) => {
    try {
      // Xóa tham chiếu đến product trong product
      // await author.updateMany(
      //   { product: req.params.id },
      //   { $pull: { product: req.params.id } }
      // );
      // Xóa product theo ID
      await product.findByIdAndDelete(req.params.id);

      res.status(200).json("Xóa thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = productCon;
