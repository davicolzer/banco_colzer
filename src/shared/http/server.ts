import express from 'express';
import { router } from './routes';
import { port } from '../../constants';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.listen(port, ()=> {
  console.log("Server Started")
});
