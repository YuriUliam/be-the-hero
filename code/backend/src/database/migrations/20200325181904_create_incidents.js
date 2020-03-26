/**
 * @typedef {import('knex')} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = (knex) => {
  return knex.schema.createTable('incidents', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()
    table.string('ong_id').notNullable()
    table.foreign('ong_id').references('id').inTable('ongs')
  })
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTable('incidents')
};
