const productController = require("../controllers/productController");

const router = require("express").Router();

//add
router.post("/", productController.add);

//get list
router.get("/", productController.getAll);

//get detail
router.get("/:id", productController.getDetail);

//update
router.put("/:id", productController.update);

//delete
router.delete("/:id", productController.delete);

module.exports=router;