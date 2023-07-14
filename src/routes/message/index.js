import { Router } from 'express';
import { getAllMessage, createMessage } from '../../controllers/message.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую роль
router.post('/create', authVerfity, createMessage);
// Отобразить все роли
router.get('/get', authVerfity, getAllMessage);

export default router;
