// Example CRUD routes with JOI validation
import express from 'express'
const router = express.Router()
import { getExample, getAllExample, postExample, putExample, deleteExample } from '../controllers/exampleController'
import { validate, Joi } from 'express-validation'

router.get('/test-route', getAllExample)
router.get('/test-route/:name', getExample)
router.post('/test-route', validate({
  body: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    info: Joi.object().optional().allow(''),
    hobbies: Joi.array().optional().allow('')
  }).options({ presence: 'required' })
}, {}, {}), postExample)
router.put('/test-route/:name', validate({
    body: Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      info: Joi.object().optional(),
      hobbies: Joi.array().optional()
    }).options({ presence: 'required' })
  }, {}, {}), putExample)
router.delete('/test-route/:name', deleteExample)

export default router