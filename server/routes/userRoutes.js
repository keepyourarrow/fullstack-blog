const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const { getUserValidator } = require("../validators/userValidator");

//#region GET ALL
router.get("/", usersController.getAllUsers);
//#endregion

//#region GET BLOG BY TITLE
router.get("/:id", usersController.getUserById);
//#endregion

module.exports = router;
