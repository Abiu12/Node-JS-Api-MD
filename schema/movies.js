import z from 'zod'
const movieSchema = z.object({
    title:z.string({
        invalid_type_error:'Movie title must be a string',
        required_error:'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string()
})

export function validateMovie(object){
    return movieSchema.safeParse(object)
}

export function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}
