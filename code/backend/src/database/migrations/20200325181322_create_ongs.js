/**
 * @typedef {import('knex')} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = (knex) => {
  return knex.schema.createTable('ongs', (table) => {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTable('ongs')
};
