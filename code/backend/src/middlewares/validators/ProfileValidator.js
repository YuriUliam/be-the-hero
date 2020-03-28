const { celebrate, Segments, Joi } = require('celebrate')

/**
 * @module Validator/Profile
 */
module.exports = {
  index: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown()
  })
}