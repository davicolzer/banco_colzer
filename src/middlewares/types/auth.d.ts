import { NextFunction, Request, Response } from 'express';
import { DefaultError } from '../../shared/errors';

export type ICheckTokenMiddle = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void | Response>;

export type ILoggedUser = Pick<User, 'fullname' | 'cpf' | 'id'>;
  