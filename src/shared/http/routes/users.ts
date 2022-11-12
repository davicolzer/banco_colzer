import express from 'express';
import { checkTokenMiddle } from '../../../middlewares/auth';
import { userController } from '../../../modules';

const userRoute = express();

userRoute.post('/create', userController.createOne);
userRoute.put('/transfer', checkTokenMiddle, userController.transfer);
userRoute.put('/deposite', userController.deposite);
userRoute.get('/balance/', checkTokenMiddle, userController.balance);

export { userRoute };
