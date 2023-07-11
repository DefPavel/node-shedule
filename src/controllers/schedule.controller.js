import {
  getAll,
  createSchedule,
  changeSchedule,
  getByDoctor,
  getByDoctors,
  getById,
  deleteById,
} from '../models/schedule.js';
import { findUserById, getAllUsersIsChecked } from '../models/user.js';

// Отобразить все заявки
export const getAllSchedules = async (_req, res) => {
  try {
    const schedules = await getAll();
    const allData = [];

    if (schedules.length > 0) {
      for (const iterator of schedules) {
        const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
        allData.push({
          id: iterator.id,
          title: `${iterator.userName}; ${iterator.personName}; ${
            iterator.description
          }; ${iterator.is_phone === 1 ? iterator.personPhone : 'тел. без ответа'}`,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
          color: iterator.color,
          isPhone: iterator.is_phone === 1 ? true : false,
          isComming: iterator.is_comming === 1 ? true : false,
        });
      }
    }
    res.status(200).send(allData);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
// Отобразить все заявки которые выбраны
export const getAllSchedulesIsCheckedUser = async (_req, res) => {
  try {
    const allData = [];
    // Берем всех докторов которые выбраны
    const checkedDoctors = await getAllUsersIsChecked();
    if (checkedDoctors.length > 0) {
      const sheduleByChecked = await getByDoctors(
        checkedDoctors.map((item) => item.id)
      );
      for (const iterator of sheduleByChecked) {
        const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
        allData.push({
          id: iterator.id,
          title: `${iterator.userName}; ${iterator.personName}; ${
            iterator.description
          }; ${iterator.is_phone === 1 ? iterator.personPhone : 'Тел.: без ответа'}`,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
          color: iterator.color,
          isPhone: iterator.is_phone === 1 ? true : false,
          isComming: iterator.is_comming === 1 ? true : false,
        });
      }
    } else {
      // Вернуть все записи
      const schedules = await getAll();
      if (schedules.length > 0)
        for (const iterator of schedules) {
          const time = new Date(iterator.hire_date).toLocaleTimeString(
            'ru-RU',
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          );
          allData.push({
            id: iterator.id,
            title: `${iterator.userName}; ${iterator.personName}; ${
              iterator.description
            }; ${iterator.is_phone === 1 ? iterator.personPhone : 'Тел.: без ответа'}`,
            phone: iterator.personPhone,
            start: new Date(iterator.hire_date),
            end: new Date(iterator.hire_date),
            time: time,
            description: iterator.description,
            doctor: iterator.userName,
            doctor_id: iterator.doctor_id,
            color: iterator.color,
            isPhone: iterator.is_phone === 1 ? true : false,
            isComming: iterator.is_comming === 1 ? true : false,
          });
        }
    }
    res.status(200).send(allData);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// Отобразить все заявки по массиву IdDoctors
export const getScheduleByArrayIdDoctors = async (req, res) => {
  try {
    const { arrayId = [] } = req.body;
    const schedules = await getByDoctors(arrayId);
    const allData = [];

    if (schedules.length > 0) {
      for (const iterator of schedules) {
        const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
        allData.push({
          id: iterator.id,
          title: `${iterator.userName}; ${iterator.personName}; ${
            iterator.description
          }; ${iterator.is_phone === 1 ? iterator.personPhone : 'Тел.: без ответа'}`,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
          color: iterator.color,
          isPhone: iterator.is_phone === 1 ? true : false,
          isComming: iterator.is_comming === 1 ? true : false,
        });
      }
    }
    res.status(200).send(allData);
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

      if (!findDoctor)
        return res.status(500).send({ error: 'Доктор не найден' });

      await createSchedule({
        full_name: title.trim(),
        hire_date: `${begin} ${time}`,
        phone: phone,
        doctor_id: findDoctor.id,
        description: description.trim(),
        is_phone: isPhone === 'true' ? 1 : 0,
        is_comming: isComming === 'true' ? 1 : 0,
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
        is_phone: isPhone === 'true' ? 1 : 0,
        is_comming: isComming === 'true' ? 1 : 0,
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
  const {idDoctor: id} = req.params;
  try {
	if (!id) throw 'ID пользователя не указан!';
    const schedules = await getByDoctor(id);
    const allData = [];

    if (schedules.length > 0) {
      for (const iterator of schedules) {
        const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
        allData.push({
          id: iterator.id,
          title: `${iterator.userName}; ${iterator.personName}; ${
            iterator.description
          }; ${iterator.is_phone === 1 ? iterator.personPhone : 'Тел.: без ответа'}`,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
          color: iterator.color,
          isPhone: iterator.is_phone,
          isComming: iterator.is_comming,
        });
      }
    }
    res.status(200).send(allData);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// Удалить событие
export const dropSheduleById = async (req, res) => {
  try {
    const { id = 0 } = req.params;
    const findShedule = await getById(id);

    if (!findShedule)
      return res.status(500).send({ error: 'Не найдена запись' });
    await deleteById(findShedule.id);
    res.status(200).send({ status: 'drop schedule' });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
