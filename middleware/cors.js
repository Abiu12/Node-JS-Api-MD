import cors from 'cors'
export const corsMiddleware = () => cors({
    origin:(origin,callback) =>{
    const ACCEPTED_ORIGIN = [
        'http://127.0.0.1:5500'
    ]
    if(ACCEPTED_ORIGIN.includes(origin)){
        return callback(null,true)
    }
    if(!origin){
        return callback(null,true)
    }
    return callback(new Error('Not allowed by CORS'))
}
})
//Para el cors con el delete de forma manual sin instalar cors
// app.options('movies/:id',(req,res) =>{
//     console.log("Entre al options");
//     const origin = req.header('origin')
//     // if(ACCEPTED_ORIGIN.includes(origin)|| !origin){
//         res.header('Access-Control-Allow-Origin','*')
//         res.header('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
//     // }
//     res.send(200)
// })
//Todos los recursos movies

