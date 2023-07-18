import clinicDB from '../config/database.js';

export const findMessageByName = (name) => {
  return clinicDB('message').where('name', name).first();
};
export const findMessageByDate = (date) => {
    return clinicDB('message').where(clinicDB.raw('date(date_crt) = ?', date)).first();
};
export const create = (message) => {
  return clinicDB('message').insert(message);
};
export const getAll = () => {
  return clinicDB('message').select('id as key', 'name', clinicDB.raw(`DATE_FORMAT(date_crt, '%d.%m.%y') as date_crt`));
};

export const deleteMess = (id) => {
  return clinicDB('message').where('id', id).delete();
};