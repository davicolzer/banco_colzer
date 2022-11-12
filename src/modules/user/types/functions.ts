import { User } from '@prisma/client';
import { IDeposite, IFindUser, ITransfer, IUser } from './dtos';

export interface IUserRepository {
  createOne(data: IUser): Promise<User>;
  updateOne(data: User): Promise<User>;
  findOne(data: IFindUser): Promise<User | null>;
}

export interface IUserService {
  createOne(data: IUser): Promise<User>;
  balance(cpf: string): Promise<{ cpf: string; balance: number }>;
  transfer(data: ITransfer): Promise<void>;
  deposite(data: IDeposite): Promise<void>;
}
