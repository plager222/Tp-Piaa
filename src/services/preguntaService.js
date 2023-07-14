import sql from 'mssql'
import configDB from '../../DB.js'
import 'dotenv/config'

export class PreguntaService {
    UpdatePregunta = async (Pregunta, Id) => {




        const pool = await sql.connect(configDB)
        const preguntaOriginal = await this.GetPreguntaById(Id)

        const result = await pool.request()
            .input('pId', sql.Int, Id)
            .input('pPregunta', sql.VarChar, Pregunta?.Pregunta ?? preguntaOriginal.Pregunta)
            .input('pOpcion1', sql.VarChar, Pregunta?.Opcion1 ?? preguntaOriginal.Opcion1)
            .input('pOpcion2', sql.VarChar, Pregunta?.Opcion2 ?? preguntaOriginal.Opcion2)
            .input('pOpcion3', sql.VarChar, Pregunta?.Opcion3 ?? preguntaOriginal.Opcion3)
            .input('pOpcion4', sql.VarChar, Pregunta?.Opcion4 ?? preguntaOriginal.Opcion4)
            .input('pRespuestaCorrecta', sql.Int, Pregunta.RespuestaCorrecta ?? preguntaOriginal.RespuestaCorrecta)


            .query('UPDATE Preguntas SET Pregunta = @pPregunta, Opcion1 = @pOpcion1, Opcion2 = @pOpcion2, Opcion3 = @pOpcion3, Opcion4 = @pOpcion4, RespuestaCorrecta = @pRespuestaCorrecta WHERE PreguntaId = @pId');
        console.log(result)


        return result.recordset;
    }

    AgregarPregunta = async (pregunta) => {
        var error = "Algun Atributo no fue enviado"
        if (!pregunta.Pregunta || !pregunta.Opcion1 || !pregunta.Opcion2 || !pregunta.Opcion3 || !pregunta.Opcion4 || !pregunta.RespuestaCorrecta) {
            return error
        }

        const fechaActual = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const connection = await sql.connect(configDB)
        const results = await connection.request()

            .input("pPregunta", sql.VarChar, pregunta.Pregunta)
            .input("pfechaActual", sql.VarChar, fechaActual)
            .input("pOpcion1", sql.VarChar, pregunta.Opcion1)
            .input("pOpcion2", sql.VarChar, pregunta.Opcion2)
            .input("pOpcion3", sql.VarChar, pregunta.Opcion3)
            .input("pOpcion4", sql.VarChar, pregunta.Opcion4)
            .input("pRespuestaCorrecta", sql.Int, pregunta.RespuestaCorrecta)

            .query('INSERT INTO Preguntas (Pregunta,Opcion1, Opcion2, Opcion3, Opcion4,RespuestaCorrecta,FechaCreacion) VALUES (@pPregunta,@pOpcion1, @pOpcion2 , @pOpcion3 ,@pOpcion4,@pRespuestaCorrecta, @pfechaActual)')

        console.log(results)
    }
    EliminarPregunta = async (Id) => {
        const conn = await sql.connect(configDB)
        const results = await conn.request().input("pId", sql.Int, Id)
            .query(' DELETE FROM Respuestas WHERE  PreguntaId = @pId DELETE FROM Preguntas WHERE PreguntaId = @pId')


        console.log(results)
    }

    GetPreguntas = async () => {

        const conn = await sql.connect(configDB)
        const results = await conn.request()

            .query('SELECT * FROM Preguntas')

        return results.recordset
    }

    GetRandomPregunta = async () => {
        const conn = await sql.connect(configDB)
        const results = await conn.request()


            .query("SELECT * FROM Preguntas ORDER BY NewId()")

        return results.recordset[0]
    }
    //GetById
    GetPreguntaById = async (Id) => {
        const conn = await sql.connect(configDB)
        const results = await conn.request()

            .input("pId", sql.Int, Id)
            .query("SELECT * FROM Preguntas where PreguntaId = @pId")

        console.log(results.recordset)
        return results.recordset[0]

    }

}