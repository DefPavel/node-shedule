// роли
exports.up = function (knex) {
  return knex.schema.createTable('roles', (t) => {
    t.increments('id');
    t.string('name', 100).notNullable().comment('Наименование здания');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('roles');
};
