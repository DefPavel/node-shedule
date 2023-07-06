import { Router } from 'express';
import {
  getAllSchedules,
  createSchedules,
  updateSchedules,
  getScheduleByDoctor,
  getScheduleByArrayIdDoctors
} from '../../controllers/schedule.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую заявку
router.post('/create',authVerfity, createSchedules);
// Изменить заявку
router.post('/update',authVerfity, updateSchedules);
// Отобразить все заявки
router.get('/get',authVerfity, getAllSchedules);
// Отобразить заявки на определенного юзера
router.get('/get/:idDoctor',authVerfity, getScheduleByDoctor);
// Отобразить заявки только определенных юзеров
router.post('/arrayDoctors',authVerfity, getScheduleByArrayIdDoctors);

export default router;
