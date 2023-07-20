import { Router } from 'express';
import { getAllMessage, createMessage, deleteMessage, getMessageToDay } from '../../controllers/message.controller.js';
import authVerity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую сообщение
router.post('/create', authVerity, createMessage);
// Отобразить все сообщения
router.get('/get', authVerity, getAllMessage);
// вернуть сообщение на сегодня
router.get('/today', authVerity, getMessageToDay);
// Удалить сообщение
router.delete('/del/:id', authVerity, deleteMessage);

export default router;
