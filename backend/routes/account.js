const accountCon = require("../controllers/accountCon");
const middlewareCon = require("../controllers/middlewareCon");

const router = require("express").Router();
// dang ki
router.post("/add", accountCon.addAccount);
//dagn nhập
router.post("/login", accountCon.login);
// đăng xuất
router.post("/logout", middlewareCon.varifyToken,accountCon.logout);

// reresh
router.post("/refresh", accountCon.requestRefreshToken);

module.exports = router;
