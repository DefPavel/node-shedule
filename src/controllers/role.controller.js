import { findRoleByName, getAll } from '../models/role.js';

// Отобразить все роли
export const getAllRoles = async (req, res) => {
  try {
    const roles = await getAll();
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name = '' } = req.body;

    if (!name) return res.status(400).send({ error: 'Параметр не указан' });

    const roleFind = await findRoleByName(name);

    if (roleFind) return res.status(400).send({ error: 'Данная роль уже существует!' });

    res.status(200).send({ status: 'Ok' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
