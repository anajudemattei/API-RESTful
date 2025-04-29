const pool = require("../config/database.js");

const getCosmeticos = async () => {
    const result = await pool.query("SELECT * FROM cosmeticos");
    return result.rows;
};

const getCosmeticoById = async (id) => {
    const result = await pool.query("SELECT * FROM cosmeticos WHERE id = $1", [id]);
    return result.rows[0];
};

const createCosmetico = async (name, categoria) => {
    const result = await pool.query(
        "INSERT INTO cosmeticos (name, categoria) VALUES ($1, $2) RETURNING *",
        [name, categoria]
    );
    return result.rows[0];
};

const updateCosmetico = async (id, name, categoria) => {
    const result = await pool.query(
        "UPDATE cosmeticos SET name = $1, categoria = $2 WHERE id = $3 RETURNING *",
        [name, categoria, id]
    );
    return result.rows[0];  
};

const deleteCosmetico = async (id) => {
    const result = await pool.query("DELETE FROM cosmeticos WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
       return {error: "Cosmético não encontrado"};
    }
    return {message: "Cosmético deletado com sucesso"};
};

module.exports = { getCosmeticos, getCosmeticoById, createCosmetico, updateCosmetico, deleteCosmetico };