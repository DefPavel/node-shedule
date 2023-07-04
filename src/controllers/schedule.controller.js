import { getAll, createSchedule, changeSchedule, getByDoctor } from '../models/schedule.js';
import { findUserById } from '../models/user.js';

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
          title: iterator.personName,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
			 color: iterator.color,
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
	 color = null,
  } = req.body;
  try {

    if (begin && time) {
      const findDoctor = await findUserById(doctor);

      if (!findDoctor) return res.status(500).send({ error: 'Доктор не найден' });
  
      await createSchedule({
        full_name: title,
        hire_date: `${begin} ${time}`,
        phone: phone,
        doctor_id: findDoctor.id,
        description: description,
		  bg_color: color
      });
    }
    else return res.status(500).send({ error: 'Не указана дата или время' });

    res.status(200).send({ status: 'created schedules' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Создать заявку
export const updateSchedules = async (req, res) => {
  const {
    title = 'Не указано',
    begin = '',
    time = '',
    phone = 'Не указано',
    doctor = 0,
    description = '',
	  color = null,
  } = req.body;
  try {

    if (begin && time) {
      const findDoctor = await findUserById(doctor);

      if (!findDoctor) return res.status(500).send({ error: 'Доктор не найден' });
  
      await changeSchedule({
        full_name: title,
        hire_date: `${begin} ${time}`,
        phone: phone,
        doctor_id: findDoctor.id,
        description: description,
		    bg_color: color
      });
    }
    else return res.status(500).send({ error: 'Не указана дата или время' });

    res.status(200).send({ status: 'change schedule' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Отобразить заявки только для определенного юзера
export const getScheduleByDoctor = async (_req, res) => {
  try {
    const schedules = await getByDoctor();
    const allData = [];

    if (schedules.length > 0) {
      for (const iterator of schedules) {
        const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });
        allData.push({
          id: iterator.id,
          title: iterator.personName,
          phone: iterator.personPhone,
          start: new Date(iterator.hire_date),
          end: new Date(iterator.hire_date),
          time: time,
          description: iterator.description,
          doctor: iterator.userName,
          doctor_id: iterator.doctor_id,
			    color: iterator.color
        });
      }
    }
    res.status(200).send(allData);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

