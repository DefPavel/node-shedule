import clinicDB from '../config/database.js';

export const findRoleByName = (name) => {
  return clinicDB('roles').where('name', name).first();
};

export const findRoleById = (id) => {
  return clinicDB('roles').where('id', id).first();
};

export const createRole = (role) => {
  return clinicDB('roles').insert(role);
};

export const getAll = () => {
  return clinicDB('roles');
};
