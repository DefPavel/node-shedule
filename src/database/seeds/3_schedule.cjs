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
      full_name: 'Пациентов В.В.',
      phone: '+7 (922) 555-1234',
      doctor_id: 2,
      hire_date: '2023-06-18T09:00:00',
      description: 'Жалуется на головную боль'
    },
    {
      id: 2,
      full_name: 'Пациентов А.А.',
      phone: '+7 (922) 555-1234',
      doctor_id: 2,
      hire_date: '2023-06-18T11:00:00',
      description: 'Жалуется на головную боль'
    },
  ]);
};
  