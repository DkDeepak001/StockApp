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
