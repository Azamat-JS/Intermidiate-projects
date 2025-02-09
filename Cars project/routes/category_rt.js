
const { Router } = require("express");
const {
  getAllCategories,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categories");
const { checkAdminToken, tokenChecker } = require("../middleware/checkToken");
const {singleFile} = require("../utils/multer")

const router = Router();


router.get("/categories", tokenChecker, getAllCategories);

router.get("/categories/:brand", tokenChecker, getOneCategory);

router.post("/add_category", checkAdminToken, singleFile, addCategory);

router.put("/update_category/:categoryId", checkAdminToken, updateCategory);

router.delete("/delete_category/:categoryId", checkAdminToken, deleteCategory);

module.exports = router;
