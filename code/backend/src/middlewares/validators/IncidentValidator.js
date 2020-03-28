const { celebrate, Segments, Joi } = require('celebrate')

/**
 * @module Validator/Incident
 */
module.exports = {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    })
  }),

  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required().min(16),
      value: Joi.number().required().min(1)
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),


  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    })
  })
}