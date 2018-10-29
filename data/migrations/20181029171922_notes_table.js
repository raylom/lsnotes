exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", function(tbl) {
    //primary key called id
    tbl.increments();

    tbl.string("title", 255).notNullable();
    tbl.string("textBody", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};
