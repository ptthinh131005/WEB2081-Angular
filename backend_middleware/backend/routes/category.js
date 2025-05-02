const categoryCon = require("../controllers/categoryCon");
// PhuongNL21: Thêm middlewareCon
const middlewareCon = require("../controllers/middlewareCon");

const router = require("express").Router();
// add category
router.post("/", middlewareCon.varifyTokenAndAdminAuth, categoryCon.addcategory); // PhuongNL21: Bổ sung middlewareCon
router.get("/", categoryCon.getAllcategory);
router.get("/:id", categoryCon.getAncategory);
router.put("/:id", middlewareCon.varifyTokenAndAdminAuth, categoryCon.updatecategory); // PhuongNL21: Bổ sung middlewareCon
router.delete("/:id", middlewareCon.varifyTokenAndAdminAuth, categoryCon.deletecategory); // PhuongNL21: Bổ sung middlewareCon
module.exports = router;
