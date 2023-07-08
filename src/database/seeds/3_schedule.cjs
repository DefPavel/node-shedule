/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('shedule').del();
  await knex('shedule').insert([
    {
      id: 1,
      full_name: 'В.В. Пациентов',
      phone: '+7 (922) 555-1234',
      doctor_id: 2,
      hire_date: '2023-07-10T09:00:00',
      description: 'Жалуется на головную боль',
      is_phone: false,
      is_comming: false,
    },
    {
      id: 2,
      full_name: 'А.А. Пациентов',
      phone: '+7 (922) 555-1234',
      doctor_id: 2,
      hire_date: '2023-07-10T11:00:00',
      description: 'Жалуется на головную боль',
      is_phone: false,
      is_comming: false,
    },
  ]);
};
  