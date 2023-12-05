import {Router} from 'express'
import { validateMovie, validatePartialMovie } from '../schema/movies.js'
// import movies from './movies.json' with {type: 'json'}
// //Primera forma
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))

//Segunda forma + rapida y recomendada por midu 
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()
//Obtener las peliculas
moviesRouter.get('/', MovieController.getAll)
//Obtener una pelicula por un id
moviesRouter.get('/:id', MovieController.getById);
//Agregar una pelicula
moviesRouter.post('/', MovieController.create);
//Actualizar una pelicula
moviesRouter.patch('/:id', MovieController.update)
//Borrar una pelicula
moviesRouter.delete('/:id',MovieController.delete)
