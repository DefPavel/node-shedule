import clinicDB from '../config/database.js';

export const findUserById = (id) => {
  return clinicDB('users').where('id', id).first();
};

export const deleteUser = (id) => {
  return clinicDB('users').where('id', id).delete();
};

export const createUser = (user) => {
  return clinicDB('users').insert(user);
};

export const getAllUsers = () => {
  return clinicDB
    .select(
      'name as role',
      'username',
      'phone',
      'full_name',
      'users.id as key',
      'users.role_id'
    )
    .from('users')
    .join('roles as r', 'r.id', 'users.role_id');
};

export const getAllByDoctors = () => {
  return clinicDB
    .select(
      'name as role',
      'username',
      'phone',
      'full_name',
      'users.id as key',
      'users.role_id'
    )
    .from('users')
    .join('roles as r', 'r.id', 'users.role_id')
    .where('role_id', 2);
};

export const findUserByUserName = (username) => {
  return clinicDB('users').where('username', username).first();
};

export const findUserByFullName = (fullname) => {
  return clinicDB('users').whereILike('username', `%${fullname}%`);
};
