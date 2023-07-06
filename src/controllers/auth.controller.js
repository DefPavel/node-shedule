import Bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import { findUserByUserName } from '../models/user.js';

// Авторизация
export const login = async (req, res) => {
  const { username = '', password = '' } = req.body;

  const user = await await findUserByUserName(username);

  if (!user) return res.status(400).send({ error: 'Данный логин не существует!' });

  const validPassword = await Bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send({ error: 'Неверный пароль!' });

  try {
    const token = Jwt.sign({ id: user.id }, process.env.SECRET_JWT, {
      expiresIn: '12h',
    });
    res.status(200).send({ ...user, token });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
