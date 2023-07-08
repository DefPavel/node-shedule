/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      username: 'admin',
      password: '$2a$08$SkjioIkMRvcNNozd6DOb0.uRZBD6PrN1PFfYUbEu7u5oE2YbKOmgq', // root
      full_name: 'А.А. Админов',
      phone: '+7 (959) 333-00-60',
      role_id: 1,
      bg_color: '#33ACFF'
    },
    {
      id: 2,
      username: 'doctor',
      password: '$2a$08$MFTeqUpq58Cym9jsg8.8RepX/uut1mXoUNMXvRPu1Ne.jCVu9DeF2', // doctor
      full_name: 'А.А. Докторов',
      phone: '+7 (959) 444-00-60',
      role_id: 2,
      bg_color: '#fc2f21'
    },
  ]);
};
