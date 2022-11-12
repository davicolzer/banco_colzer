import { DefaultError } from '../../shared/errors';
import { isValidCpf } from '../../utils/validateDoc';
import {
  depositeValidator,
  IDeposite,
  IFindUser,
  ITransfer,
  IUser,
  transferValidator,
  userValidator,
} from './types/dtos';
import { IUserRepository, IUserService } from './types/functions';
import * as bcrypt from 'bcrypt';
import { bcryptSalt } from '../../constants';

export default function UserService(
  userRepository: IUserRepository
): IUserService {
  async function createOne(data: IUser) {
    const parsed = await userValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Incorrect payload',
        fields: parsed.error.issues,
      });
    }

    const foundUser = await userRepository.findOne({ cpf: data.cpf });

    if (foundUser) {
      throw new DefaultError({
        code: 404,
        message: 'Já existe uma conta com esse CPF',
      });
    }

    const salt = await bcrypt.genSalt(bcryptSalt);
    const passwordHash = await bcrypt.hash(data.password, salt).catch((e) => {
      throw new DefaultError({
        code: 500,
        message: 'Internal Server Error',
      });
    });

    const createdUser = await userRepository.createOne({
      ...data,
      password: passwordHash,
    });

    return createdUser;
  }

  async function balance(cpf: string) {
    if (!isValidCpf(cpf)) {
      throw new DefaultError({ code: 400, message: 'CPF incorreto' });
    }

    const foundUser = await userRepository.findOne({ cpf });

    if (!foundUser) {
      throw new DefaultError({ code: 404, message: 'CPF não encontrado' });
    }

    return { cpf: foundUser.cpf, balance: foundUser.cash };
  }

  async function transfer(data: ITransfer) {
    const parsed = await transferValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Informações incorretas',
        fields: parsed.error.issues,
      });
    }

    if (data.value > 2000) {
      throw new DefaultError({
        code: 400,
        message: `Valor máximo de tranferência de R$2000,00`,
      });
    }

    const fromUser = await userRepository.findOne({ cpf: data.cpf });
    const toUser = await userRepository.findOne({ cpf: data.cpfTo });

    if (!fromUser) {
      throw new DefaultError({
        code: 400,
        message: `CPF ${data.cpf} não encontrado`,
      });
    }

    if (fromUser.cash - data.value < 0) {
      throw new DefaultError({ code: 400, message: `Saldo insuficiente` });
    }

    if (!toUser) {
      throw new DefaultError({
        code: 400,
        message: `CPF ${data.cpfTo} não encontrado`,
      });
    }

    const updatedFromUser = await userRepository.updateOne({
      ...fromUser,
      cash: fromUser.cash - data.value,
    });

    const updatedToUser = await userRepository.updateOne({
      ...toUser,
      cash: toUser.cash + data.value,
    });
  }

  async function deposite(data: IDeposite) {
    const parsed = await depositeValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Informações incorretas',
        fields: parsed.error.issues,
      });
    }

    const foundUser = await userRepository.findOne({ cpf: data.cpf });

    if (!foundUser) {
      throw new DefaultError({
        code: 404,
        message: `CPF ${data.cpf} não encontrado`,
      });
    }

    await userRepository.updateOne({
      ...foundUser,
      cash: foundUser.cash + data.value,
    });
  }

  return {
    createOne,
    balance,
    transfer,
    deposite,
  };
}
