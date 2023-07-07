// расписание
exports.up = function (knex) {
  return knex.schema.createTable('shedule', (t) => {
    t.increments('id').primary().unsigned();
    t.string('full_name', 350).defaultTo('Не указано').comment('ФИО больного');
    t.string('phone', 20).defaultTo('Не указано').comment('Телефон больного');
    t.boolean('is_phone').defaultTo(false).comment('Дозвонились ли');
    t.boolean('is_comming').defaultTo(false).comment('Пришел ли');
    t.string('phone', 20).defaultTo('Не указано').comment('Телефон больного');
    t.string('description', 500).comment('Описание');
    t.integer('doctor_id')
      .references('users.id')
      .unsigned()
      .index()
      .onDelete('CASCADE')
      .comment('На какого доктора записано');
    t.timestamp('hire_date')
      .defaultTo(knex.fn.now())
      .comment('Дата записи на приём');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('shedule');
};
