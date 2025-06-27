import {z} from 'zod/v4'

export const RegisterRequestSchema = z.object({
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    username: z.string().max(100),
    email: z.email(),
    password: z.string().min(8).max(128)
})




export const LoginRequestSchema = z.object({
    username: z.string().max(100),
    password: z.string().min(8).max(128)
})

export const GetByIdRequestSchema = z.object({
    id: z.coerce.number().positive()
})
