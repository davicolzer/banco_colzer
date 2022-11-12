import { ILogin } from './dtos';

import { User } from '@prisma/client';

export type ILoggedUser = Pick<User, 'fullname' | 'cpf' | 'id'>;
export type ILoggedIn = { token: string; user: ILoggedUser };

export interface IAuthService {
  login(data: ILogin): Promise<ILoggedIn>;
}
