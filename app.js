import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'
const app = express()
app.use(express.json()) //Para pasar bien los json
app.use(corsMiddleware()) // middleware para el cors
// app.use(cors())
app.disable('x-powered-by')  // deshabilitar el header X-powered-By
//Rutas
app.use('/movies',moviesRouter)
const PORT = 1234
app.listen(PORT, (req, res) => {
    console.log("listening on port http://localhost:1234");
})

