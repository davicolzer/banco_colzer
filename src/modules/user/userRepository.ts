import { User } from '@prisma/client';
import { userInfo } from 'os';
import { DefaultError } from '../../shared/errors';
import { prisma } from '../../shared/infra/prisma';
import { IFindUser, IUser } from './types/dtos';
import { IUserRepository } from './types/functions';

export default function UserRepository(): IUserRepository {
  async function createOne(data: IUser) {
    const createdUser = await prisma.user
      .create({
        data,
      })
      .catch((reason) => {
        throw new DefaultError({ code: 500, message: reason });
      });

    return createdUser;
  }
  async function updateOne(data: User) {
    const updatedUser = await prisma.user
      .update({
        where: {
          id: data.id,
        },
        data,
      })
      .catch((reason) => {
        throw new DefaultError({ code: 500, message: reason });
      });

    return updatedUser;
  }
  async function findOne(data: IFindUser) {
    const user = await prisma.user
      .findUnique({
        where: { ...data },
      })
      .catch((reason) => {
        throw new DefaultError({ code: 500, message: reason });
      });

    return user;
  }

  return {
    createOne,
    findOne,
    updateOne,
  };
}
