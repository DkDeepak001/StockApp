import { z } from "zod";


// CreatePostSchema
export const CreatePostFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title should be atleast 1 letter"
  }),
  content: z.string().min(3, {
    message: "descripition should be more than 3 letter"
  }),
});

export type CreatePostSchema = z.infer<typeof CreatePostFormSchema>


// LoginFormSchema
export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email Address"
  }),
  password: z.string().min(5, {
    message: "Password should be min of 2 "
  })
})

export type LoginScehma = z.infer<typeof LoginFormSchema>


// RegisterFormScehma
export const RegisterFormScehma = z.object({
  email: z.string().email({
    message: "Invalid Email Address"
  }),
  password: z.string().min(8, {
    message: "password should be atleast 8 Charcters"
  }),
  username: z.string().min(3, {
    message: "username should be atleast 3 Charcters"
  }).max(15, {
    message: "username should not exceed 15 Charctera"
  }),
  firstName: z.string(),
  lastName: z.string()
})

export type RegisterSchema = z.infer<typeof RegisterFormScehma>
