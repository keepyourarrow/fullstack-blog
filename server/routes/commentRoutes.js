const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { postCommentValidator } = require("../validators/commentsValidators");

//#region POST
router.post("/", postCommentValidator, commentController.post_comment);
//#endregion POST

module.exports = router;
