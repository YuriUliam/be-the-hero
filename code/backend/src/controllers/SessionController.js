/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} Next
 *
 * @typedef {(req: Request, res: Response, next: Next) => Void} ControllerMethod
 * 
 */

/** Imports */
const crypto = require('crypto')

/** DB Connection */
const connection = require('../database/connection')

/**
 * @module Controller/Session
 */
module.exports = {
  /**
   * @type {ControllerMethod}
   */
  create: async (req, res) => {
    const { id } = req.body

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      res.status(400).json({ error: 'No ONG found with this ID' })
      return
    }

    res.json(ong)
    return
  }
}