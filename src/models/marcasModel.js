const pool = require("../config/database.js");

const getMarcas = async () => {
    try {
        console.log("Executando consulta para buscar todas as marcas...");
        const result = await pool.query("SELECT * FROM marcas");
        console.log("Resultado da consulta:", result.rows); 
        return result.rows;
    } catch (error) {
        console.error("Erro ao executar consulta no banco de dados:", error); 
        throw error; 
    }
};

const getMarcaById = async (id) => {
    const result = await pool.query("SELECT * FROM marcas WHERE id = $1", [id]);
    return result.rows[0];
};

const createMarca = async (name, fundador) => {
    const result = await pool.query(
        "INSERT INTO marcas (name, fundador) VALUES ($1, $2) RETURNING *",
        [name, fundador]
    );
    return result.rows[0];
};

const updateMarca = async (id, name, fundador) => {
    const result = await pool.query(
        "UPDATE marcas SET name = $1, fundador = $2 WHERE id = $3 RETURNING *",
        [name, fundador, id]
    );
    return result.rows[0];  
};

const deleteMarca = async (id) => {
    const result = await pool.query("DELETE FROM marcas WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
       return {error: "Marca não encontrada"};
    }
    return {message: "Marca deletada com sucesso"};
};

module.exports = { getMarcas, getMarcaById, createMarca, updateMarca, deleteMarca};