
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', post => {
      post.increments();
  
      post.string('title', 100).notNullable();
      post.string('content', 500).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    // undo the operation in up
    return knex.schema.dropTableIfExists('posts');
  };
