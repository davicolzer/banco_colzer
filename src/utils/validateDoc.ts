import { cnpj, cpf } from 'cpf-cnpj-validator';

export function isValidCpf(arg?: string) {
  return arg ? cpf.isValid(arg) : false;
}

export function isValidCnpj(arg?: string) {
  return arg ? cnpj.isValid(arg) : false;
}
