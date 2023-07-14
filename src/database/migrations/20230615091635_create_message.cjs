// роли
exports.up = function (knex) {
    return knex.schema.createTable('message', (t) => {
      t.increments('id');
      t.string('name', 550).notNullable().comment('Сообщение');
      t.timestamp('date_crt')
      .defaultTo(knex.fn.now())
      .comment('Дата записи');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('message');
  };
  