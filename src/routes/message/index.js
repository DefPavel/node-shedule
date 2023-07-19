import { Router } from 'express';
import { getAllMessage, createMessage, deleteMessage, getMessageToDay } from '../../controllers/message.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую сообщение
router.post('/create', authVerfity, createMessage);
// Отобразить все сообщения
router.get('/get', authVerfity, getAllMessage);
// вернуть сообщение на сегодня
router.get('/today', authVerfity, getMessageToDay);
// Удалить сообщение
router.delete('/del/:id', authVerfity, deleteMessage);

export default router;
