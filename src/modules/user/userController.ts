import { Request, Response } from 'express';
import { DefaultError } from '../../shared/errors';
import { IDeposite, ITransfer, IUser } from './types/dtos';
import { IUserService } from './types/functions';

export default function UserController(userService: IUserService) {
  async function createOne(request: Request, response: Response) {
    try {
      const data = request.body as IUser;
      const createdUser = await userService.createOne(data);

      const { password, ...user } = createdUser;

      return response.status(201).json({ user });
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }

  async function transfer(request: Request, response: Response) {
    try {
      const data = request.body as ITransfer;
      await userService.transfer(data);

      return response
        .status(201)
        .json({ message: 'Tranferência efetuada com sucesso.' });
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }

  async function deposite(request: Request, response: Response) {
    try {
      const data = request.body as IDeposite;
      await userService.deposite(data);

      return response
        .status(201)
        .json({ message: 'Deposito efetuado com sucesso.' });
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }

  async function balance(request: Request, response: Response) {
    try {
      const { cpf } = request.body;
      const balance = await userService.balance(cpf);

      return response.status(200).json(balance);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }

  return {
    createOne,
    transfer,
    deposite,
    balance,
  };
}
