import {
  getAll,
  createSchedule,
  changeSchedule,
  getByDoctor,
  getByDoctors,
  getById,
  deleteById,
  checkedShedule,
  checkedOnlyDateShedule,
  getArrayFormat,
} from '../models/schedule.js';
import { findUserById, getAllUsersIsChecked } from '../models/user.js';

// Отобразить все заявки
export const getAllSchedules = async (_req, res) => {
  try {
    const schedules = await getAll();
    const arrayFormat = getArrayFormat(schedules);
    res.status(200).send(arrayFormat);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
// Отобразить все заявки которые выбраны
export const getAllSchedulesIsCheckedUser = async (_req, res) => {
  try {
    let allData;
    // Берем всех докторов которые выбраны
    const checkedDoctors = await getAllUsersIsChecked();
    if (checkedDoctors.length > 0) {
      const scheduleByChecked = await getByDoctors(
        checkedDoctors.map((item) => item.id)
      );
      allData = getArrayFormat(scheduleByChecked);

    } else {
      // Вернуть все записи
      const schedules = await getAll();
      allData = getArrayFormat(schedules);
    }
    res.status(200).send(allData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Отобразить все заявки по массиву IdDoctors
export const getScheduleByArrayIdDoctors = async (req, res) => {
  try {
    const { arrayId = [] } = req.body;
    const schedules = await getByDoctors(arrayId);
    const arrayFormat = getArrayFormat(schedules);
    res.status(200).send(arrayFormat);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
// записи на выбранный день и доктора
export const getAllSchedulesByDateTime = async (req, res) => {
  const { doctor = 0, dateTime = '' } = req.body;
  try {
    const date = new Date(dateTime).toISOString().split('T');
    const dateFrom = `${date[0]}T08:00:00.000Z`;
    const dateTo = `${date[0]}T18:00:00.000Z`;

    const schedules = await checkedOnlyDateShedule({
      idDoctor: doctor,
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
    res.status(200).send(schedules || []);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// Создать заявку
export const createSchedules = async (req, res) => {
  const {
    title = 'Не указано',
    begin = '',
    time = '',
    phone = 'Не указано',
    doctor = 0,
    description = '',
    isPhone = false,
    isComming = false,
  } = req.body;
  try {
    if (begin && time) {
      const findDoctor = await findUserById(doctor);
      const findSchedule = await checkedShedule({
        idDoctor: doctor,
        dateTime: `${begin} ${time}`,
      }).first();

      // проверка на существования доктора
      if (!findDoctor)
        return res.status(500).send({ error: 'Доктор не найден!' });
      // проверка на существование записи
      if (findSchedule)
        return res
          .status(500)
          .send({ error: 'Запись на данное время уже есть!' });

      await createSchedule({
        full_name: title.trim(),
        hire_date: `${begin} ${time}`,
        phone: phone,
        doctor_id: findDoctor.id,
        description: description.trim(),
        is_phone: 'true' === isPhone ? 1 : 0,
        is_comming: 'true' === isComming ? 1 : 0,
      });
    } else return res.status(500).send({ error: 'Не указана дата или время' });

    res.status(200).send({ status: 'created schedules' });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ error: error });
  }
};

// Создать заявку
export const updateSchedules = async (req, res) => {
  const {
    id = 0,
    title = 'Не указано',
    begin = '',
    time = '',
    phone = 'Не указано',
    doctor = 0,
    description = '',
    isPhone = false,
    isComming = false,
  } = req.body;
  try {
    if (begin && time) {
      const findDoctor = await findUserById(doctor);

      if (!findDoctor)
        return res.status(500).send({ error: 'Доктор не найден' });
      await changeSchedule({
        id: id,
        full_name: title.trim(),
        hire_date: `${begin} ${time}`,
        phone: phone,
        doctor_id: findDoctor.id,
        description: description.trim(),
        is_phone: 'true' === isPhone ? 1 : 0,
        is_comming: 'true' === isComming ? 1 : 0,
      });
    } else return res.status(500).send({ error: 'Не указана дата или время' });

    res.status(200).send({ status: 'change schedule' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Отобразить заявки только для определенного юзера
export const getScheduleByDoctor = async (req, res) => {
  const { idDoctor: id } = req.params;
  try {
    if (!id) return res.status(500).send({ error: 'ID пользователя не указан!' });
    const schedules = await getByDoctor(id);
    const arrayFormat = getArrayFormat(schedules);
    res.status(200).send(arrayFormat);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// Удалить событие
export const dropSheduleById = async (req, res) => {
  try {
    const { id = 0 } = req.params;
    const findSchedule = await getById(id);

    if (!findSchedule)
      return res.status(500).send({ error: 'Не найдена запись' });
    await deleteById(findSchedule.id);
    res.status(200).send({ status: 'drop schedule' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
