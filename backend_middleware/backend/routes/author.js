const authorCon = require("../controllers/authorCon");

const router = require("express").Router();
///add
router.post("/", authorCon.addAuthor);
// get all
router.get("/", authorCon.getAllAuthor);
// get an

router.get("/:id", authorCon.getAnAuthor);
router.get("/link/:link", authorCon.getLink);
router.get("/product/:link", authorCon.getProduct);
router.get("/id/:id", authorCon.getId);
// updateAuthor
router.put("/:id", authorCon.updateAuthor);
router.put("/id/:id", authorCon.updateAuthorId);
// delete
router.delete("/:id", authorCon.deleteAuthor);

module.exports = router;
