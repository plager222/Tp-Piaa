import "dotenv/config"
import express from "express";

import RespuestaService from "./src/controllers/respuestaController.js"
import PreguntaService from "./src/controllers/preguntaController.js"

const app = express()
const port = 5000

app.use(express.json());

app.use('/respuestas', RespuestaService)
app.use('/preguntas', PreguntaService)

app.listen(port,()=> {
    console.log(port)
})