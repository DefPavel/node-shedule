import { Router } from 'express';
import { getAllMessage, createMessage, deleteMessage } from '../../controllers/message.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую роль
router.post('/create', authVerfity, createMessage);
// Отобразить все роли
router.get('/get', authVerfity, getAllMessage);
// Удалить сообщение
router.delete('/del/:id', authVerfity, deleteMessage);

export default router;
