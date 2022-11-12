import { rejects } from 'assert';
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  it,
  Mocked,
  test,
  vi,
} from 'vitest';
import { DefaultError } from '../../../shared/errors';
import { IUserRepository, IUserService } from '../types/functions';
import _UserRepository from '../userRepository';
import _UserService from '../userService';
import {
  createdUserA,
  createdUserB,
  foundUserA,
  foundUserAWithMoney,
  foundUserB,
  foundUserBWithMoney,
  notFoundUser,
  payloadDepositeA,
  payloadTransferA2B,
  payloadTransferA2BIncorrect,
  payloadUserA,
  payloadUserB,
  payloadUserIncorrect,
  updatedUserAAfterTransferToB,
  updatedUserBAfterTransferFromA,
  updatedUserDeposite,
} from './mocking';

let userService: IUserService;

const userRepository = _UserRepository() as Mocked<IUserRepository>;

describe('User Services', () => {
  beforeAll(() => {
    userService = _UserService(userRepository);
  });

  test('Should be able create user', async () => {
    vi.spyOn(userRepository, 'createOne').mockResolvedValueOnce(
      await Promise.resolve(createdUserA)
    );
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(notFoundUser)
    );

    const newUser = await userService.createOne(payloadUserA);

    expect(newUser).equal(createdUserA);
  });

  test('Should not be able create user with incorrect payload', async () => {
    vi.spyOn(userRepository, 'createOne').mockResolvedValueOnce(
      await Promise.resolve(createdUserA)
    );

    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(notFoundUser)
    );

    await expect(
      userService.createOne(payloadUserIncorrect)
    ).rejects.toThrowError(DefaultError);
  });

  test('Should be able deposite', async () => {
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserDeposite)
    );

    expect(await userService.deposite(payloadDepositeA)).not.toThrowError(
      DefaultError
    );
  });

  test('Should be able to get balance', async () => {
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserA)
    );

    const balance = await userService.balance(payloadUserA.cpf);

    expect(balance).toEqual({ cpf: foundUserA.cpf, balance: foundUserA.cash });
  });

  test('Should be able to transfer money', async () => {
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserBWithMoney)
    );
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserAWithMoney)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserBAfterTransferFromA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserAAfterTransferToB)
    );

    expect(await userService.transfer(payloadTransferA2B)).not.toThrowError(
      DefaultError
    );
  });

  test('Should not be able to transfer money and having a negative balance', async () => {
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserBWithMoney)
    );
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserBAfterTransferFromA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserAAfterTransferToB)
    );

    await expect(userService.transfer(payloadTransferA2B)).rejects.toThrowError(
      DefaultError
    );
  });

  test('Should not be able to transfer money more than $2000.00', async () => {
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserBWithMoney)
    );
    vi.spyOn(userRepository, 'findOne').mockResolvedValueOnce(
      await Promise.resolve(foundUserA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserBAfterTransferFromA)
    );

    vi.spyOn(userRepository, 'updateOne').mockResolvedValueOnce(
      await Promise.resolve(updatedUserAAfterTransferToB)
    );

    await expect(
      userService.transfer(payloadTransferA2BIncorrect)
    ).rejects.toThrowError(DefaultError);
  });
});
