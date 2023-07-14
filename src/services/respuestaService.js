import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'
import {PreguntaService} from './preguntaService.js'


const preguntaService = new PreguntaService()

export class RespuestaService {
    CreateRespuesta = async (respuesta) => {
        const idPreg = respuesta.PreguntaId
        let esResCorrecta = false
        const fechaActual= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        
        const connection = await sql.connect(configDB)
        const pregunta = await preguntaService.GetPreguntaById(idPreg)
        
        
        

        if (pregunta.RespuestaCorrecta == respuesta.RespuestaSeleccionada) {
            esResCorrecta = true
        }
        const results = await connection.request()
            .input("pResSel", sql.Int, respuesta.RespuestaSeleccionada)
            .input("pFecha", sql.VarChar, fechaActual)
            .input("pEsResCorrecta", sql.Bit, esResCorrecta)
            .input("pPregId", sql.Int, idPreg)
            .input("pUserId", sql.Int, respuesta.UserId)

            .query('INSERT INTO Respuestas (UserId, RespuestaSeleccionada, FechaCreacion, EsRespuestaCorrecta,PreguntaId) VALUES (@pUserId, @pResSel, @pFecha, @pEsResCorrecta, @pPregId)')

        console.log(results)

    }
    GetRespuestas = async () => {

        const conn = await sql.connect(configDB)
        const results = await conn.request()

            .query('SELECT * FROM Respuestas')

        return results.recordset
    }
}