require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cosmeticosRoutes = require("./src/routes/cosmeticosRoutes");
const marcasRoutes = require("./src/routes/marcasRoutes"); 
const reportRoutes = require("./src/routes/reportRoutes.js");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/cosmeticos", cosmeticosRoutes);
app.use("/api/marcas", marcasRoutes); 
app.use("/api", reportRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
