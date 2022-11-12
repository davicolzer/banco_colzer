import express from 'express';
import { authRoute } from './auth';
import { userRoute } from './users';

const router = express();

router.use('/user', userRoute);
router.use('/auth', authRoute);

export { router };
