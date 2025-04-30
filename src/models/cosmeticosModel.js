const pool = require("../config/database.js");

const getCosmeticos = async (name) => {
    if(!name){
        const result = await pool.query("SELECT * FROM cosmeticos");
        return result.rows;
    }
    else{
        const result = await pool.query("SELECT * FROM cosmeticos WHERE name ILIKE $1", [`%${name}%`]);
        return result.rows;
    }
};

const getCosmeticoById = async (id) => {
    const result = await pool.query("SELECT * FROM cosmeticos WHERE id = $1", [id]);
    return result.rows[0];
};

const createCosmetico = async (name, categoria, photo) => {
    const result = await pool.query(
        "INSERT INTO cosmeticos (name, categoria, photo) VALUES ($1, $2) RETURNING *",
        [name, categoria, photo]
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