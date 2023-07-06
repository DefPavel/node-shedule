// пользователи
exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary().unsigned();
    t.string('username', 50).unique().index().comment('Логин');
    t.string('password', 100).comment('Пароль');
    t.string('bg_color', 20).comment('Цвет записи');
    t.string('full_name', 350)
      .defaultTo('Не указано')
      .comment('Инициалы пользователя');
    t.string('phone', 20).defaultTo('Не указано').comment('Телефон');
    t.integer('role_id')
      .references('roles.id')
      .unsigned()
      .index()
      .onDelete('CASCADE')
      .comment('Роль пользователя');
    t.timestamp('created_at').defaultTo(knex.fn.now()).comment('Дата создания');
    t.timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .comment('Дата изменения');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
