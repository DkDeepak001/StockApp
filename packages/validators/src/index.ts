import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});


export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid Email Address"
  }),
  password: z.string().min(5, {
    message: "Password should be min of 2 "
  })
})

export type LoginScehma = z.infer<typeof LoginFormSchema>


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
