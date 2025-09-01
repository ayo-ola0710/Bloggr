import { z } from "zod";

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(0, { message: "pls enter a password" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const SignUpValidation = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  location: z.string().min(2, { message: "Pls enter your location" }),
  password: z
    .string()
    .min(0, { message: "pls enter a password" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
