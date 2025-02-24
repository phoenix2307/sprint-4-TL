import {z} from 'zod'

// const passwordValidation = new RegExp(
//     /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// );

export const loginSchema = z.object({
    email: z.string().min(1, {message: 'Email is required'}).email({message: 'Incorrect email address'}),
    password: z.string()
        .min(4, {message: 'Password must be at least 4 characters long'}),
    rememberMe: z.boolean()
})
export type Inputs = z.infer<typeof loginSchema>