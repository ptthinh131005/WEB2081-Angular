const middlewareCon = require("../controllers/middlewareCon");
const userCon = require("../controllers/userCon");

const router = require("express").Router();
router.get("/", middlewareCon.varifyToken, userCon.getUser);
router.delete("/:id", middlewareCon.varifyTokenAndAdminAuth, userCon.deleteUser);

//test chưa cần token
router.get("/get", userCon.getUser);
router.get("/get/:id", userCon.getAnUser);
router.put("/put/:id", userCon.updateUser);
router.delete("/delete/:id", userCon.deleteUser);


module.exports = router;
