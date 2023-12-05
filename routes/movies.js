import {Router} from 'express'
import { validateMovie, validatePartialMovie } from '../schema/movies.js'
// import movies from './movies.json' with {type: 'json'}
// //Primera forma
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))

//Segunda forma + rapida y recomendada por midu 
import { createRequire } from 'node:module'
import { MovieModel } from '../models/movie.js'
import { MovieController } from '../controllers/movies.js'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')

export const moviesRouter = Router()
//Obtener las peliculas
moviesRouter.get('/',MovieController.getAll)
//Obtener una pelicula por un id
moviesRouter.get('/:id', async (req, res) =>{
    const {id} = req.params
    const movie = await MovieModel.getById({id})
    res.status(404).json({message: "Movies not found"})
});
//Agregar una pelicula
moviesRouter.post('/', async (req, res) =>{
    const resultMovie = validateMovie(req.body)
    if(resultMovie.error){
        return res.status(400).send({error: JSON.parse(resultMovie.error.message)})
    }
    const newMovie = await MovieModel.create({input:resultMovie.data})
    res.status(201).json(newMovie)
});
//Actualizar una pelicula
moviesRouter.patch('/:id', async(req, res) =>{
    const resultMovie = validatePartialMovie(req.body)
    if(resultMovie.error){
        return res.status(400).json({error: JSON.parse(resultMovie.error.message)})
    }
    const {id} = req.params
    const updatedMovie = await MovieModel.update({id,input:resultMovie.data})
    return res.json(updatedMovie)

})
//Borrar una pelicula
moviesRouter.delete('/movies/:id',async (req,res) =>{
    const {id} = req.params
    const deleteMovie = await MovieModel.delete({id:id})
    return res.json({message: 'Pelicula eliminada'})
})
