const express = require("express");
const { sendOTP, verifyOTP, GetData } = require("../Controller/twillio");


const router = express.Router();

router.route("/send").post(sendOTP);
router.route("/verifysms").post(verifyOTP);
router.route("/").get(GetData);
module.exports = router;