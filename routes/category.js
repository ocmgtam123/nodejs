const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

//add
router.post("/", categoryController.add);

//get list
router.get("/", categoryController.getAll);

//get detail
router.get("/:id", categoryController.getDetail);

//update
router.put("/:id", categoryController.update);

//delete
router.delete("/:id", categoryController.delete);

module.exports=router;