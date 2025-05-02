const productCon = require("../controllers/productCon");
// PhuongNL21: Thêm middlewareCon
const middlewareCon = require("../controllers/middlewareCon");

const router = require("express").Router();
// add product
router.post("/", middlewareCon.varifyTokenAndAdminAuth, productCon.addproduct);// PhuongNL21: Bổ sung middlewareCon
router.get("/", productCon.getAllproduct);
router.get("/:id", productCon.getAnproduct);
router.put("/:id", middlewareCon.varifyTokenAndAdminAuth, productCon.updateproduct);// PhuongNL21: Bổ sung middlewareCon
router.delete("/:id", middlewareCon.varifyTokenAndAdminAuth, productCon.deleteproduct);// PhuongNL21: Bổ sung middlewareCon
module.exports = router;
