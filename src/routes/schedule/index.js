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
import authVerity from '../../middleware/authVerfity.js';

const router = Router();

// Создать новую заявку
router.post('/create', authVerity, createSchedules);
// Изменить заявку
router.post('/update', authVerity, updateSchedules);
// Удалить заявку
router.delete('/del/:id', authVerity, dropSheduleById);
// Отобразить все заявки
router.get('/get', authVerity, getAllSchedules);
// Отобразить Выбранные или все
router.get('/getIsChecked', authVerity, getAllSchedulesIsCheckedUser);
// Отобразить заявки на определенного юзера
router.get('/get/:idDoctor', authVerity, getScheduleByDoctor);
// Отобразить заявки только определенных юзеров
router.post('/arrayDoctors', authVerity, getScheduleByArrayIdDoctors);
// Отобразить записи по параметрам
router.post('/arrayDate', authVerity, getAllSchedulesByDateTime);

export default router;
