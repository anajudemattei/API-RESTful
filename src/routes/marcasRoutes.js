const express = require("express");
const router = express.Router();
const marcasController = require("../controllers/marcasController");
const apiKeyMiddleware = require('../config/apiKey.js')
  
  
 router.use(apiKeyMiddleware);

router.get("/", marcasController.getAllMarcas);
router.get("/:id", marcasController.getMarcas);
router.post("/", marcasController.createMarca);
router.put("/:id", marcasController.updatedMarca);
router.delete("/:id", marcasController.deleteMarcas);

module.exports = router;
