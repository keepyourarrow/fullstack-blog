const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { putCountViews } = require("../validators/categoriesValidators");

//#region GET ALL
router.get("/", categoryController.getAllCategories);
//#endregion

//#region GET Category BY TITLE
router.get("/:name", categoryController.getCategoryByName);
//#endregion

//#region PUT
router.put("/count-views", putCountViews, categoryController.count_views);
//#endregion PUT

module.exports = router;
