import { DefaultError } from '../../shared/errors';
import { IUserRepository } from '../user/types/functions';
import { ILogin, loginValidator } from './types/dtos';
import { IAuthService } from './types/functions';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../constants';

export default function AuthService(
  userRepository: IUserRepository
): IAuthService {
  async function login(data: ILogin) {
    const parsed = await loginValidator.safeParseAsync(data);
    if (!parsed.success) {
      throw new DefaultError({
        code: 400,
        message: 'Usuário ou senha incorretos',
        fields: parsed.error.issues,
      });
    }

    const foundUser = await userRepository.findOne({ cpf: data.cpf });

    if (!foundUser) {
      throw new DefaultError({
        code: 404,
        message: `Usuário ou senha incorretos`,
      });
    }

    const checkedPassword = await bcrypt.compare(
      data.password,
      foundUser.password
    );

    if (!checkedPassword) {
      throw new DefaultError({
        code: 404,
        message: `Usuário ou senha incorretos`,
      });
    }

    const { id, cpf, fullname } = foundUser;

    const token = jwt.sign({ id, cpf, fullname }, jwtSecret, {
      expiresIn: 60 * 60 * 24, // 1 day
    });

    return { token, user: { id, cpf, fullname } };
  }

  return {
    login,
  };
}
