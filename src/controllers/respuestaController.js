import { Router } from 'express'
import {RespuestaService} from '../services/respuestaService.js'


const router = Router()
const respuestaService = new RespuestaService();

router.post('',async(req,res)=>
{
    console.log('Post')
    const respuesta = await respuestaService.CreateRespuesta(req.body)
    return res.status(200).json(respuesta)
})

export default router