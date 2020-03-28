const { celebrate, Segments, Joi } = require('celebrate')

/**
 * @module Validator/Session
 */
module.exports = {
  index: celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required().length(8)
    })
  })
}