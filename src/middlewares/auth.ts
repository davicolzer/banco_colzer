import { NextFunction, Request, Response } from 'express';
import { jwtSecret } from '../constants';
import { DefaultError } from '../shared/errors';
import { ICheckTokenMiddle, ILoggedUser } from './types/auth';
import * as jwt from 'jsonwebtoken';

export const checkTokenMiddle: ICheckTokenMiddle = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new DefaultError({
        code: 401,
        message: 'Token não informado',
      });
    }

    const token = authHeader.split(' ')[1];
    const data = jwt.verify(token, jwtSecret) as ILoggedUser;

    request.body = {...request.body, cpf: data.cpf}

    next();
  } catch (e) {
    const { code, ...error } = e as DefaultError;
    return response.status(code).json({ ...error });
  }

};
