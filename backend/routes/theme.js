const themeCon = require("../controllers/themeCon");

const router = require("express").Router();
// add theme
router.post("/", themeCon.addTheme);
router.get("/", themeCon.getAllTheme);
// router.get("/:id", themeCon.getAnTheme);
router.put("/:id", themeCon.updateTheme);
router.delete("/:id", themeCon.deleteTheme);
module.exports = router;
