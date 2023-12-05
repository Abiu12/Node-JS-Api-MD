import { MovieModel } from "../models/localdatabase/movie.js"
import { validateMovie, validatePartialMovie } from "../schema/movies.js"
export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        //que es lo que renderiza
        res.json(movies)
    }
    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)
        res.status(404).json({ message: "Movies not found" })
    }
    static async create(req, res) {
        const resultMovie = validateMovie(req.body)
        if (resultMovie.error) {
            return res.status(400).send({ error: JSON.parse(resultMovie.error.message) })
        }
        const newMovie = await MovieModel.create({ input: resultMovie.data })
        res.status(201).json(newMovie)
    }
    static async update(req, res) {
        const resultMovie = validatePartialMovie(req.body)
        if (resultMovie.error) {
            return res.status(400).json({ error: JSON.parse(resultMovie.error.message) })
        }
        const { id } = req.params
        const updatedMovie = await MovieModel.update({ id, input: resultMovie.data })
        return res.json(updatedMovie)
    }
    static async delete(req, res) {
        const { id } = req.params
        const result = await MovieModel.delete({ id: id })
        if(result === false) {
            return res.status(404).json({ message: 'Movie not found'})
        }
        return res.json({ message: 'Pelicula eliminada' })
    }
}
