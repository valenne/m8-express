const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const moment = require("moment");

// importing function from consultas.js
const {
  newCurso,
  getCursos,
  modifyCursos,
  deleteCurso,
} = require("./routes/consultas.js");
// conecting to express
const app = express();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

app.get("/", (req, res) => {
  const indexFile = path.join(__dirname, "/public/index.html");
  res.sendFile(indexFile);
});

app.get("/cursos", async (req, res) => {
  const response = await getCursos();

  // return for console the response
  console.log(`data return: ${response}`);
  res.send(response);
});

// get de data body from index.html
app.post("/curso", async (req, res) => {
  const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;

  // format date
  const formatDate = moment(fechaInicio).format("YYYY-MM-DD");

  const response = await newCurso(nombre, nivelTecnico, formatDate, duracion);
  res.send(response);
});

app.put("/curso/", async (req, res) => {
  const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;

  // format date
  const formatDate = moment(fechaInicio).format("YYYY-MM-DD");

  const response = await modifyCursos(
    req.body.id,
    nombre,
    nivelTecnico,
    formatDate,
    duracion
  );

  console.log(`The following data has been modified: ${response}`);
  res.send(response);
});

app.delete("/curso/:id", (req, res) => {
  const { id } = req.params;
  const response = deleteCurso(id);
  console.log(`deleting data with id: ${id} success`);
  res.send(response);
});
