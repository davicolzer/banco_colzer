import _UserRepository from './user/userRepository';
import _UserService from './user/userService';
import _UserController from './user/userController';
import AuthService from './auth/authService';
import AuthController from './auth/authController';

// Repositories
const UserRepository = _UserRepository();

// User Module
const UserService = _UserService(UserRepository);
export const userController = _UserController(UserService);

// Auth Module
const authService = AuthService(UserRepository);
export const authController = AuthController(authService);
