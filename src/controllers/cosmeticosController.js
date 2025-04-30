const db = require("../config/database");

// Buscar todos os cosméticos
const getAllCosmetico = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM cosmeticos");

        const cosmeticosComUrl = result.rows.map(c => ({
            ...c,
            foto_url: c.foto ? `${req.protocol}://${req.get("host")}/uploads/${c.foto}` : null
        }));

        res.json(cosmeticosComUrl);
    } catch (error) {
        console.error("Erro ao buscar cosméticos:", error);
        res.status(500).json({ message: "Erro ao buscar cosméticos." });
    }
};

// Buscar cosmético por ID
const getCosmeticos = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM cosmeticos WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Cosmético não encontrado." });
        }

        const c = result.rows[0];
        const cosmeticoComUrl = {
            ...c,
            foto_url: c.foto ? `${req.protocol}://${req.get("host")}/uploads/${c.foto}` : null
        };

        res.json(cosmeticoComUrl);
    } catch (error) {
        console.error("Erro ao buscar cosmético:", error);
        res.status(500).json({ message: "Erro ao buscar cosmético." });
    }
};

// Criar cosmético com upload de foto
const createCosmeticoComFoto = async (req, res) => {
    try {
        const { name, categoria } = req.body;
        const foto = req.file ? req.file.filename : null;

        const result = await db.query(
            "INSERT INTO cosmeticos (name, categoria, foto) VALUES ($1, $2, $3) RETURNING *",
            [name, categoria, foto]
        );

        const newCosmetico = result.rows[0];
        newCosmetico.foto_url = foto ? `${req.protocol}://${req.get("host")}/uploads/${foto}` : null;

        res.status(201).json(newCosmetico);
    } catch (error) {
        console.error("Erro ao criar cosmético:", error);
        res.status(500).json({ message: "Erro ao criar cosmético." });
    }
};

// Atualizar cosmético
const updateCosmetico = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, categoria } = req.body;

        const result = await db.query(
            "UPDATE cosmeticos SET name = $1, categoria = $2 WHERE id = $3 RETURNING *",
            [name, categoria, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao atualizar cosmético:", error);
        res.status(500).json({ message: "Erro ao atualizar cosmético." });
    }
};

// Deletar cosmético
const deleteCosmetico = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM cosmeticos WHERE id = $1", [id]);
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar cosmético:", error);
        res.status(500).json({ message: "Erro ao deletar cosmético." });
    }
};

module.exports = {
    getAllCosmetico,
    getCosmeticos,
    createCosmeticoComFoto,
    updateCosmetico,
    deleteCosmetico
};
