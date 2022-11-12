import { z } from 'zod';
import { isValidCpf } from '../../../utils/validateDoc';

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

export const loginValidator = z.object({
  password: z
    .string()
    .min(8)
    .regex(
      passwordRegex,
      'Sua senha deve ter no mínimo 8 caracteres e pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caracter especial'
    ),
  cpf: z
    .string()
    .length(11, 'CPF Incorreto')
    .refine(isValidCpf, 'CPF Incorreto'),
});

export type ILogin = z.infer<typeof loginValidator>;