const express = require("express");
const router = express.Router();
const batchesController = require("../controllers/prodAve");

router.get("", batchesController.getBatchList);

router.post("", batchesController.addBatch);

router.put("", batchesController.editBatch);

router.delete("", batchesController.deleteBatch);

router.get("/search", batchesController.searchBatches);

router.put("/shed", batchesController.updateShed);

module.exports = router;
