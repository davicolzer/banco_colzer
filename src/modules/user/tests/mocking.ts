import { User } from '@prisma/client';
import { IDeposite, ITransfer, IUser } from '../types/dtos';

export const payloadUserA: IUser = {
  fullname: 'Fulado da Silva',
  cpf: '55026247903',
  password: 'Teste#321',
};

export const payloadUserB: IUser = {
  fullname: 'Beltrano da Silva',
  cpf: '84308231310',
  password: 'Teste#654',
};

export const payloadUserIncorrect: IUser = {
  fullname: '',
  cpf: '321',
  password: 'passa',
};

export const createdUserA: User = {
  id: '0c83ddd3-3991-426b-b8f6-33b4e90acd06',
  fullname: payloadUserA.fullname,
  cpf: payloadUserA.cpf,
  password: payloadUserA.password,
  cash: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createdUserB: User = {
  id: 'a6692fec-e924-4549-97c5-565268fc60e2',
  fullname: payloadUserB.fullname,
  cpf: payloadUserB.cpf,
  password: payloadUserB.password,
  cash: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const foundUserA = createdUserA;
export const foundUserB = createdUserB;

export const notFoundUser = null;

export const payloadDepositeA: IDeposite = {
  value: 0,
  cpfTo: payloadUserA.cpf,
};

export const updatedUserDeposite: User = {
  ...foundUserA,
  cash: foundUserA.cash + payloadDepositeA.value,
};


export const foundUserAWithMoney: User = { ...createdUserA, cash: 5000 };
export const foundUserBWithMoney: User = { ...createdUserB, cash: 5000 };

export const payloadTransferA2B: ITransfer = {
  cpfFrom: payloadUserA.cpf,
  cpfTo: payloadUserB.cpf,
  value: 50,
};

export const payloadTransferA2BIncorrect: ITransfer = {
  cpfFrom: payloadUserA.cpf,
  cpfTo: payloadUserB.cpf,
  value: 2500,
};

export const updatedUserAAfterTransferToB: User = {
  ...foundUserAWithMoney,
  cash: foundUserAWithMoney.cash - payloadTransferA2B.value
}

export const updatedUserBAfterTransferFromA: User = {
  ...foundUserBWithMoney,
  cash: foundUserBWithMoney.cash + payloadTransferA2B.value
}