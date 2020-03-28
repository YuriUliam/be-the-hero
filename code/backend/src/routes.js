const { Router } = require('express')

const routes = Router()

const IncidentController = require('./controllers/IncidentController')
const OngController = require('./controllers/OngController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const OngValidator = require('./middlewares/validators/OngValidator')
const ProfileValidator = require('./middlewares/validators/ProfileValidator')
const IncidentValidator = require('./middlewares/validators/IncidentValidator')

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngValidator.create, OngController.create)

routes.get('/incidents', IncidentValidator.index, IncidentController.index)
routes.post('/incidents', IncidentValidator.create, IncidentController.create)
routes.delete('/incidents/:id', IncidentValidator.delete, IncidentController.delete)

routes.get('/profile', ProfileValidator.index, ProfileController.index)

routes.post('/sessions', SessionController.create)

module.exports = routes