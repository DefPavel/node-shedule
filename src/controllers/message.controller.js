import { getAll, create } from '../models/message.js';

// Отобразить все роли
export const getAllMessage = async (_req, res) => {
  try {
    const message = await getAll();
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { name = '', dateCrt = '' } = req.body;

    if (!name) return res.status(400).send({ error: 'Параметр не указан' });

    await create({ name , date_crt: dateCrt });

    res.status(200).send({ status: 'Ok' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
