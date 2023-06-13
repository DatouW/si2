const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuario");

router.get("", userController.getUserList);

router.put("/pwd", userController.putPwd);

router.get("/log", userController.getLogList);

router.put("/role", userController.putRole);

module.exports = router;
