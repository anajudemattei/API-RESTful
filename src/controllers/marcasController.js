const marcasModel = require("../models/marcasModel");

const getAllMarcas = async (req, res) => {
    try {
        const { name } = req.query;
        const marcas = await marcasModel.getMarcas(name);
        res.json(users);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar marcas." });
    }
};

const getMarcas = async (req, res) => {
    try {
        const user = await marcasModel.getMarcaById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: "Marca não encontrada." }); 
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar marca." });
    }
};

const createMarca = async (req, res) => {
    try {
        const { name, fundador } = req.body;
        const photo = req.file ? req.file.path : null;
        const newMarca = await marcasModel.createMarca(name, fundador, photo);
        res.status(201).json(newMarca);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return res.status(400).json({ message: "Fundador já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar marca." });
    }
};

const updatedMarca = async (req, res) => {
    try {
        const { name, fundador } = req.body;
        const updatedMarca = await marcasModel.updateMarca(req.params.id, name, fundador); 
        if (!updatedMarca) {
            return res.status(404).json({ message: "Marca não encontrada." }); 
        }
        res.json(updatedMarca);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar marca." });
    }
};

const deleteMarcas = async (req, res) => {
    try {
        const message = await marcasModel.deleteMarca(req.params.id); 
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar marcas." });
    }
};

module.exports = { getAllMarcas, getMarcas, createMarca, updatedMarca, deleteMarcas };


