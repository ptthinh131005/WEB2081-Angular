const productCon = require("../controllers/productCon");

const router = require("express").Router();
// add product
router.post("/", productCon.addproduct);
router.get("/", productCon.getAllproduct);
router.get("/:id", productCon.getAnproduct);
router.put("/:id", productCon.updateproduct);
router.delete("/:id", productCon.deleteproduct);
module.exports = router;
