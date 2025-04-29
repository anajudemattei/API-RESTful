const cosmeticosModel = require("../models/cosmeticosModel");

const getAllCosmetico = async (req, res) => {
    try {
        const users = await cosmeticosModel.getCosmeticos();
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar cosmeticos." });
    }
};

const getCosmeticos = async (req, res) => {
    try {
        const user = await cosmeticosModel.getCosmeticoById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Cosmetico não encontrado." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar cosmetico." });
    }
};

const createCosmetico = async (req, res) => {
    try {
        const { name, categoria } = req.body;
        const newCosmetico = await cosmeticosModel.createCosmetico(name, categoria);
        res.status(201).json(newCosmetico);
    } catch (error) {
	 console.log(error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Nome já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar cosmetico." });
    }
};

const updateCosmetico = async (req, res) => {
    try {
        const { name, categoria } = req.body;
        const updatedCosmetico = await cosmeticosModel.updateCosmetico(req.params.id, name, categoria);
        if (!updatedCosmetico) {
            return res.status(404).json({ message: "Cosmetico não encontrado." });
        }
        res.json(updatedCosmetico);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar cosmetico." });
    }
};

const deleteCosmetico = async (req, res) => {
    try {
        const message = await cosmeticosModel.deleteCosmetico(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar cosmetico." });
    }
};

module.exports = { getAllCosmetico, getCosmeticos, createCosmetico, updateCosmetico, deleteCosmetico };


