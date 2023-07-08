import { Router } from 'express';
import authVerfity from '../../middleware/authVerfity.js';
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
router.get('/get', authVerfity, getUsers);
// показать пользователя по id
// router.get('/get/:id', authVerfity, getById);
// показать всех докторов
router.get('/doctors', authVerfity, getUsersByDoctor);
// регистрация пользователя
router.post('/register', authVerfity, register);
// авторизация пользователя
router.post('/login', login);
// изменить статус
router.post('/checked', authVerfity, updateCheckedUser);
// удалить пользователя
router.delete('/del/:id', authVerfity, deleteUsers);

export default router;
