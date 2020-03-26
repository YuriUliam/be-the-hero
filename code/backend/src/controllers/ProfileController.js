/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 * @typedef {(req: Request, res: Response) => Void} ControllerMethod
 */

/** DB Connection */
const connection = require('../database/connection')

/**
 * @module Controller/Profile
 */
module.exports = {


  /**
   * Retorna a listagem dos incidentes
   * @type {ControllerMethod}
   */

  index: async (req, res) => {
    const ong_id = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')

    res.json(incidents)
    return
  }
}