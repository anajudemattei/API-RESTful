const express = require("express");
const router = express.Router();
const cosmeticosController = require("../controllers/cosmeticosController");
const apiKeyMiddleware = require("../config/apiKey");
const upload = require("../config/upload"); // middleware multer

router.use(apiKeyMiddleware);

router.get("/", cosmeticosController.getAllCosmetico);
router.get("/:id", cosmeticosController.getCosmeticos);
router.post("/", upload.single("foto"), cosmeticosController.createCosmeticoComFoto);
router.put("/:id", cosmeticosController.updateCosmetico);
router.delete("/:id", cosmeticosController.deleteCosmetico);

module.exports = router;
