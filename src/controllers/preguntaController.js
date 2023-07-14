import { Router } from 'express'
import {PreguntaService} from '../services/PreguntaService.js'


const router = Router()
const preguntaService = new PreguntaService();

router.get('', async(req,res)=>
{
    console.log('Get all')
    const pregunta = await preguntaService.GetPreguntas()
    return res.status(200).json(pregunta)
})
router.get('/azar', async (req, res) => {
    console.log('Get Random')
    const pregunta = await preguntaService.GetRandomPregunta()
    return res.status(200).json(pregunta)
})

router.delete('/:id', async(req,res)=>
{
    console.log('Delete')
    const pregunta = await preguntaService.EliminarPregunta(req.params.id)
    return res.status(200).json(pregunta)
})
router.post('',async(req,res)=>
{
    console.log('Post')
    const pregunta = await preguntaService.AgregarPregunta(req.body)
    return res.status(200).json(pregunta)
})
router.put('/:id',async(req,res)=>
{
    console.log('Post')
    const pregunta = await preguntaService.UpdatePregunta(req.body,req.params.id)
    return res.status(200).json(pregunta)
})


export default router