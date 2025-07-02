import { z } from "zod/v4";

// -------------------------------- Register --------------------------------

export const RegisterRequestSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  username: z.string().max(100),
  email: z.email(),
  password: z.string().min(8).max(128),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

// -------------------------------- verify email --------------------------------

export const VerifyEmailRequestSchema = z.object({
  token: z.string(),
});

export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;

// -------------------------------- Login --------------------------------
export const LoginRequestSchema = z.object({
  username: z.string().max(100),
  password: z.string().min(8).max(128),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// -------------------------------- get by id --------------------------------
export const GetByIdRequestSchema = z.object({
  id: z.string(),
});

export type GetByIdRequest = z.infer<typeof GetByIdRequestSchema>;
