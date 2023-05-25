const express = require("express");
const router = express.Router();
const AmbController = require("../controllers/ambiente");

router.get("", AmbController.getAmbienteList);

router.post("", AmbController.addAmbiente);

router.post("/batch", AmbController.addBatch);

module.exports = router;
