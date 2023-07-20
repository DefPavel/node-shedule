import clinicDB from '../config/database.js';

export const getArrayFormat = (schedules) => {
  const allData = [];
  if (schedules.length > 0) {
    for (const iterator of schedules) {
      const isPhone = `${iterator.is_phone === 1 ? '✅' : '❌'}`;
      const isComming = `${iterator.is_comming === 1 ? '✅' : '❌'}`;

      const time = new Date(iterator.hire_date).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
      allData.push({
        id: iterator.id,
        title: `${iterator.userName}; ${iterator.personName}; ${iterator.description}; ${isPhone} ${isComming}`,
        phone: iterator.personPhone,
        start: new Date(iterator.hire_date),
        end: new Date(iterator.hire_date),
        time: time,
        description: iterator.description,
        doctor: iterator.userName,
        doctor_id: iterator.doctor_id,
        color: iterator.color,
        isPhone: iterator.is_phone === 1,
        isComming: iterator.is_comming === 1,
      });
    }
  }
  return allData;
};
export const getAll = () => {
  return clinicDB
    .select(
      's.id',
      's.phone as personPhone',
      's.full_name as personName',
      's.hire_date',
      's.is_phone',
      's.is_comming',
      'user.full_name as userName',
      'user.id as doctor_id',
      's.description',
      'user.bg_color as color',
      'user.is_cheked'
    )
    .from('shedule as s')
    .join('users as user', 'user.id', 's.doctor_id');
};

export const getByDoctor = (id) => {
  return clinicDB
    .select(
      's.id',
      's.phone as personPhone',
      's.full_name as personName',
      's.hire_date',
      's.is_phone',
      's.is_comming',
      'user.full_name as userName',
      'user.id as doctor_id',
      's.description',
      'user.bg_color as color',
      'user.is_cheked'
    )
    .from('shedule as s')
    .join('users as user', 'user.id', 's.doctor_id')
    .where('doctor_id', id);
};

export const getByDoctors = (arrayId) => {
  return clinicDB
    .select(
      's.id',
      's.phone as personPhone',
      's.full_name as personName',
      's.hire_date',
      's.is_phone',
      's.is_comming',
      'user.full_name as userName',
      'user.id as doctor_id',
      's.description',
      'user.bg_color as color',
      'user.is_cheked'
    )
    .from('shedule as s')
    .join('users as user', 'user.id', 's.doctor_id')
    .whereIn('user.id', arrayId);
};

export const checkedShedule = ({ idDoctor, dateTime }) => {
  return clinicDB('shedule')
  .where('hire_date', dateTime)
  .where('doctor_id', idDoctor)
}

export const checkedOnlyDateShedule = ({ idDoctor, dateFrom, dateTo }) => {
  return clinicDB('shedule')
  .where('hire_date', '>=', dateFrom)
  .where('hire_date', '<', dateTo)
  .where('doctor_id', idDoctor)
}

export const createSchedule = (shedule) => {
  return clinicDB('shedule').insert(shedule);
};

export const changeSchedule = (shedule) => {
  return clinicDB('shedule').update(shedule).where('id', shedule.id);
};

export const getById = (id) => {
  return clinicDB('shedule').where('id', id).first();
};

export const deleteById = (id) => {
  return clinicDB('shedule').del().where('id', id);
};
