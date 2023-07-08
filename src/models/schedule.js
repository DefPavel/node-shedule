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

export const createSchedule = (shedule) => {
  return clinicDB('shedule').insert(shedule);
};

export const changeSchedule = (shedule) => {
  return clinicDB('shedule').update(shedule).where('id', shedule.id);
};
