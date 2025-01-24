import { z } from 'zod';

export const userSchema = z.object({

  username: z.string()
    .min(8, 'El nombre debe tener al menos 8 caracteres')
    .max(60, 'El nombre debe tener hasta 60 caracteres como máximo'),
  contact: z.string()
    .min(8, { message: 'El contacto debe tener al menos 10 caracteres' })
    .max(10, 'El nombre debe tener hasta 10 caracteres como máximo'),
  email: z
    .string()
    .email('El correo electrónico es inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña debe tener hasta 50 caracteres como máximo')
  // .refine((password) => /[A-Z]/.test(password), {
  //     message: "Password must contain at least one uppercase letter",
  // })
  // .refine((password) => /[a-z]/.test(password), {
  //     message: "Password must contain at least one lowercase letter",
  // })
  // .refine((password) => /[0-9]/.test(password), {
  //     message: "Password must contain at least one number",
  // })
  // .refine((password) => /[!@#$%^&*]/.test(password), {
  //     message: "Password must contain at least one special character",
  // }),
  , confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});
