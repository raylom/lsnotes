exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    //primary key called id
    tbl.increments();

    tbl.string("noteTitle", 255).notNullable();
    tbl.string("noteBody", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
