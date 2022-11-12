import { Request, Response } from 'express';
import { ICheckTokenMiddle } from '../../middlewares/types/auth';
import { DefaultError } from '../../shared/errors';
import { ILogin } from './types/dtos';
import { IAuthService } from './types/functions';

export default function AuthController(
  authService: IAuthService,
) {
  async function login(request: Request, response: Response) {
    try {
      const data = request.body as ILogin;

      const payload = await authService.login(data);

      return response.status(201).json(payload);
    } catch (e) {
      const { code, ...error } = e as DefaultError;
      return response.status(code).json({ ...error });
    }
  }

  return {
    login,
  };
}
