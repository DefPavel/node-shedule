import { Router } from 'express';
import {
  getAllSchedules,
  createSchedules,
  updateSchedules,
  dropSheduleById,
  getScheduleByDoctor,
  getScheduleByArrayIdDoctors,
  getAllSchedulesIsCheckedUser,
  getAllSchedulesByDateTime,
} from '../../controllers/schedule.controller.js';
import authVerfity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую заявку
router.post('/create', authVerfity, createSchedules);
// Изменить заявку
router.post('/update', authVerfity, updateSchedules);
// Удалить заявку
router.delete('/del/:id', authVerfity, dropSheduleById);
// Отобразить все заявки
router.get('/get', authVerfity, getAllSchedules);
// Отобразить Выбранные или все
router.get('/getIsChecked', authVerfity, getAllSchedulesIsCheckedUser);
// Отобразить заявки на определенного юзера
router.get('/get/:idDoctor', authVerfity, getScheduleByDoctor);
// Отобразить заявки только определенных юзеров
router.post('/arrayDoctors', authVerfity, getScheduleByArrayIdDoctors);
// Отобразить записи по параметрам
router.post('/arrayDate', authVerfity, getAllSchedulesByDateTime);

export default router;
