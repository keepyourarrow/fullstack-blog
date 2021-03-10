const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
    signupValidator,
    loginValidator,
    resendVerificationValidator,
} = require("../validators/authValidators");

//#region signup POST
router.post("/signup", signupValidator, authController.signup);
//#endregion

//#region verify email
router.get("/verify", authController.verifyEmail);
//#endregion

//#region resend verification email
router.get(
    "/resend-email/:email",
    resendVerificationValidator,
    authController.resendVerificationEmail
);
//#endregion

//#region login POST
router.post("/login", loginValidator, authController.login);
//#endregion

module.exports = router;
