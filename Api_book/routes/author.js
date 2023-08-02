const authorController = require("../controllers/authorController");

const router =  require("express").Router();

//add author
router.post("/", authorController.addAuthor);
//Get all author
router.get("/",authorController.getAllAuthor);
//Get an author
router.get("/:id", authorController.getAnAuthor);
// Update an author
router.put('/:id', authorController.updateAuthor);
//delete an author
router.delete("/:id", authorController.deleteAuthor);


module.exports = router;    