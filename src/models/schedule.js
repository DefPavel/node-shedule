import clinicDB from '../config/database.js';

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
