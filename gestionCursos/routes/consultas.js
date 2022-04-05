const { pool } = require("../db/init");

const newCurso = async (nombre, nivelTecnico, fechaInicio, duracion) => {
  try {
    const SQLQuery = {
      text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [nombre, nivelTecnico, fechaInicio, duracion],
    };

    const response = await pool.query(SQLQuery);
    console.log(`data return: ${response.rows}`);
    const dataJSON = JSON.stringify(response.rows);
    return dataJSON;
  } catch (err) {
    console.log(`error details ${err.stack}`);
  }
};

const getCursos = async () => {
  try {
    const SQLQuery = {
      text: `SELECT * FROM cursos`,
      values: [],
    };

    const response = await pool.query(SQLQuery);
    // console.log("consultas.js(getCursos())", response.rows);
    const dataJSON = JSON.stringify(response.rows);
    return dataJSON;
  } catch (err) {
    console.log(`error details ${err.stack}`);
  }
};

const modifyCursos = async (
  id,
  nombre,
  nivelTecnico,
  fechaInicio,
  duracion
) => {
  try {
    const SQLQuery = {
      text: `UPDATE cursos SET nombre = $2, nivel = $3, fecha = $4, duracion = $5 WHERE id = $1`,
      values: [id, nombre, nivelTecnico, fechaInicio, duracion],
    };

    const response = await pool.query(SQLQuery);
    const dataJSON = JSON.stringify(response.rows);
    return dataJSON;
  } catch (err) {
    console.log(`error details ${err.stack}`);
  }
};

const deleteCurso = async (id) => {
  try {
    const SQLQuery = {
      text: `DELETE FROM cursos where id=$1`,
      values: [id],
    };

    const response = await pool.query(SQLQuery);
    const dataJSON = JSON.stringify(response.rows);
    return dataJSON;
  } catch (err) {
    console.log(`error details ${err.stack}`);
  }
};

module.exports = { newCurso, getCursos, modifyCursos, deleteCurso };
