import { z } from 'zod';
import { isValidCpf } from '../../../utils/validateDoc';

const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
export const userValidator = z.object({
  fullname: z.string().min(1, "Digite um nome válido"),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Sua senha deve ter no mínimo 8 caracteres e pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial'
    ),
  cpf: z
    .string()
    .refine(isValidCpf, 'CPF Incorreto'),
});

export type IUser = z.infer<typeof userValidator>;

export const findUserValidator = z.object({
  id: z.string().optional(),
  cpf: z.string().optional(),
});

export type IFindUser = z.infer<typeof findUserValidator>;

export const transferValidator = z.object({
  cpf: z.string(),
  cpfTo: z.string(),
  value: z.number(),
});

export type ITransfer = z.infer<typeof transferValidator>;

export const depositeValidator = z.object({
  cpf: z.string(),
  value: z.number(),
});

export type IDeposite = z.infer<typeof depositeValidator>;