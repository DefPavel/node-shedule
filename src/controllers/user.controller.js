import {
  getAllUsers,
  findUserById,
  createUser,
  findUserByUserName,
  deleteUser,
  updateStatusUser,
  getAllByDoctors,
} from '../models/user.js';
import { findRoleById } from '../models/role.js';
import Bcrypt from 'bcryptjs';

// Создать пользователя
export const register = async (req, res) => {
  const { username = '', password = '', color = '', phone, fullname, role } = req.body;
  try {
    const checkRole = await findRoleById(role);
    // проверка роли
    if (!checkRole) return res.status(400).send({ error: 'Роль не найдена!' });

    const checkLogin = await findUserByUserName(username);
    // Проверка логина
    if (checkLogin) return res.status(400).send({ error: 'Логин уже занят!' });

    // хеш пароля
    const salt = await Bcrypt.genSalt(8);
    const hashedPassword = await Bcrypt.hash(password, salt);

    // создать пользователя
    await createUser({
      username,
      password: hashedPassword,
      phone: phone || 'Не указано',
      full_name: fullname || 'Не указано',
      role_id: checkRole.id,
      bg_color: color,    
    });

    res.status(200).send({ status: 'OK' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};
// Удалить пользователя
export const deleteUsers = async (req, res) => {
  const { id = 0 } = req.params;

  const user = await findUserById(id);

  if (!user) return res.status(400).send({ error: 'Не найден id' });

  await deleteUser(id);

  res.status(200).send({ status: 'OK' });
};
// Отобразить всех пользователей
export const getUsers = async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Отобразить всех пользователей
export const updateCheckedUser = async (req, res) => {
  try {
    const { id = 0, status = false } = req.body;
    await updateStatusUser(id, status)
    res.status(200).send({ messge: 'checked value' });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Отобразить всех пользователей
export const getUsersByDoctor = async (_req, res) => {
  try {
    const users = await getAllByDoctors();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Отобразить пользователя по id
export const getById = async (req, res) => {
  try {
    const { id = 0 } = req.params;
    const user = await findUserById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
