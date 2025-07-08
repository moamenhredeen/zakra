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

export type RegisterResponse = {};

// -------------------------------- verify email --------------------------------

export const VerifyEmailRequestSchema = z.object({
  token: z.string(),
});

export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;

// -------------------------------- Login --------------------------------
export const LoginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export type LoginResponse = { token: string; refreshToken: string };

// -------------------------------- get by id --------------------------------
export const GetByIdRequestSchema = z.object({
  id: z.coerce.number(),
});

export type GetByIdRequest = z.infer<typeof GetByIdRequestSchema>;

export type GetUserByIdResponse = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

// -------------------------------- patch --------------------------------

export const PatchUserRequestSchema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
});

export type PatchUserRequest = z.infer<typeof PatchUserRequestSchema>;

export type PatchUserResponse = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};
