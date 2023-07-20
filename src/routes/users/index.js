import { Router } from 'express';
import authVerity from '../../middleware/authVerfity.js';
import { login } from '../../controllers/auth.controller.js';
import {
  getUsers,
  // getById,
  register,
  deleteUsers,
  getUsersByDoctor,
  updateCheckedUser,
} from '../../controllers/user.controller.js';

const router = Router();
// показать всех пользователей
router.get('/get', authVerity, getUsers);
// показать пользователя по id
// router.get('/get/:id', authVerity, getById);
// показать всех докторов
router.get('/doctors', authVerity, getUsersByDoctor);
// регистрация пользователя
router.post('/register', authVerity, register);
// авторизация пользователя
router.post('/login', login);
// изменить статус
router.post('/checked', authVerity, updateCheckedUser);
// удалить пользователя
router.delete('/del/:id', authVerity, deleteUsers);

export default router;
