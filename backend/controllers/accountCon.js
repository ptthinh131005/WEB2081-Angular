// const { compare } = require("bcrypt");
const { theme, author,account } = require("../model/model");
const jwt = require("jsonwebtoken");
let refreshTokens =[]
const accountCon = {

  creareToken:(user)=>{
    return jwt.sign({
      id: user.id,
      admin: user.admin
    },process.env.ACCESS_TOKEN,{expiresIn : '30s' }
    )
  },
  creareRefreshToken:(user)=>{
    return jwt.sign({
      id: user.id,
      admin: user.admin
    },process.env.REFRESH_TOKEN,{expiresIn : '20d' })
  },
  // add
  addAccount: async (req, res) => {
    try {
      const newAccount = new account(req.body);
      const savedAccount = await newAccount.save();
      res.status(200).json(savedAccount);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const user = await account.findOne({name: req.body.name});
      if (!user) {
        return res.status(404).json("sai tên đăng nhập");
      }
      console.log(user);
      console.log(req.body);
      const validPassword = await req.body.password==user.password
      console.log(validPassword);
      if (!validPassword) {
      return res.status(404).json("sai password");
      }
      if( user && validPassword){
        const accessToken = accountCon.creareToken(user)
        const refreshToken = accountCon.creareRefreshToken(user)
        refreshTokens.push(refreshToken)
        console.log(refreshTokens);
        res.cookie("refreshToken", refreshToken,{
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite:"strict"
        })
        const {password , ...others} = user._doc 
        //res.status(200).json({ ...others,accessToken})
        // PhuongNL21: trả về refreshToken cho client
        res.status(200).json({ ...others,accessToken,refreshToken})
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    // Lấy refresh từ người dùng
    //const refreshToken = req.cookies.refreshToken;
    // PhuongNL21: sửa code
    const refreshToken = req.body;
    if (!refreshToken) return res.status(401).json("Không có token");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Quá trình xác thực lỗi");
    }
  
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(403).json("Lỗi xác thực token");
      }
  
      // Xóa refreshToken cũ khỏi danh sách
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  
      // Tạo accessToken và refreshToken mới
      const newAccessToken = accountCon.creareToken(user);
      const newRefreshToken = accountCon.creareRefreshToken(user);
  
      // Thêm refreshToken mới vào danh sách
      refreshTokens.push(newRefreshToken);
  
      // Đặt cookie với refreshToken mới
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },
  logout: async(req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
    res.status(200).json("đăng xuất thành công")
  }
  


};
module.exports = accountCon;
