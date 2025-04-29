const express = require("express");
const router = express.Router();
const cosmeticosController = require("../controllers/cosmeticosController");

router.get("/", cosmeticosController.getAllCosmetico); 
router.get("/:id", cosmeticosController.getCosmeticos); 
router.post("/", cosmeticosController.createCosmetico); 
router.put("/:id", cosmeticosController.updateCosmetico); 
router.delete("/:id", cosmeticosController.deleteCosmetico); 

module.exports = router;