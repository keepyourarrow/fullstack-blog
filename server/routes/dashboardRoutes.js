const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

//#region GET ALL
router.get("/", dashboardController.dashboard);
//#endregion

module.exports = router;
