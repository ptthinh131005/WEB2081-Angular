const categoryCon = require("../controllers/categoryCon");

const router = require("express").Router();
// add category
router.post("/", categoryCon.addcategory);
router.get("/", categoryCon.getAllcategory);
router.get("/:id", categoryCon.getAncategory);
router.put("/:id", categoryCon.updatecategory);
router.delete("/:id", categoryCon.deletecategory);
module.exports = router;
