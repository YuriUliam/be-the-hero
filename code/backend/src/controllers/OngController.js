/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 * @typedef {(req: Request, res: Response) => Void} ControllerMethod
 */

/** Imports */
const crypto = require('crypto')

/** DB Connection */
const connection = require('../database/connection')

/**
 * @module Controller/ONG
 */
module.exports = {


  /**
   * @type {ControllerMethod}
   */

  index: async (req, res) => {
    const ongs = await connection('ongs').select('*')

    res.json(ongs)
  },


  /**
   * @type {ControllerMethod}
   */

  create: async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    res.status(200).json({ id })
  }
}