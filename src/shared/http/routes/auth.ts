import express from 'express';
import { checkTokenMiddle } from '../../../middlewares/auth';
import { authController } from '../../../modules';

const authRoute = express();

authRoute.post('/login', authController.login);

export { authRoute };

