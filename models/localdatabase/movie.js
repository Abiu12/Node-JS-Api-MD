//Segunda forma + rapida y recomendada por midu 
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')


import { randomUUID } from 'node:crypto'

export class MovieModel {
    static getAll = async ({ genre }) => {
        if (genre) {
            return movies.filter(
                movie => movie.genre.toLowerCase() === genre.toLocaleLowerCase()
            )
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id == id)
        if (movie) {
            return movie
        }
    }

    static async create({input}) {
        const newMovie = {
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie)
        return newMovie
    }

    static async update({id,input}) {
        const movieIndex = movies.findIndex(movie => movie.id == id)
        if (movieIndex === -1) {
            return false
        }
        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }
        movies[movieIndex] = updateMovie
        return updateMovie
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id == id)

        if (movieIndex == -1) {
            return false
        }
        movies.splice(movieIndex, 1)
        return true
    }
}