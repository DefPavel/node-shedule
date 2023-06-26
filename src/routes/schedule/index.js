import { Router } from 'express';
import {
  getAllSchedules,
  createSchedules,
  getScheduleByDoctor,
} from '../../controllers/schedule.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую заявку
router.post('/create',authVerfity, createSchedules);
// Отобразить все заявки
router.get('/get',authVerfity, getAllSchedules);
// Отобразить заявки на определенного юзера
router.get('/get/:idDoctor',authVerfity, getScheduleByDoctor);

export default router;
