/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 *
 * @typedef {(req: Request, res: Response) => Void} ControllerMethod
 */

/** DB Connection */
const connection = require('../database/connection')

/**
 * @module Controller/Incident
 */
module.exports = {


  /**
   * Retorna a listagem dos incidentes
   * @type {ControllerMethod}
   */

  index: async (req, res) => {
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    res.header('X-Total-Count', count['count(*)'])

    res.json(incidents)
    return
  },


  /**
   * Registrar um incidente de uma ONG
   * @type {ControllerMethod}
   */

  create: async (req, res) => {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    res.status(200).json({ id })
    return
  },


  /**
   * Deleta um incidente de uma ONG
   * @type {ControllerMethod}
   */

  delete: async (req, res) => {
    const { id } = req.params
    const ong_id = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()

    if (incident.ong_id !== ong_id) {
      res.status(401).json({ error: 'Operation not permitted.' })
      return
    }

    await connection('incidents').where('id', id).delete()

    res.status(204).send()
    return
  }
}