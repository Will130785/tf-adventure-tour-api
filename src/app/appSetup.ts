import { Application, Request, Response, NextFunction } from 'express'
import exampleRoute from '../routes/exampleRoute'
import express from 'express'
import cors from 'cors'

export default (app: Application): void => {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ limit: '50mb', extended: true }))

  // Add custom header to all responses - useful for testing responses
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.set('TF-Application', '0')
    next()
  })

  // Init routes
  app.use('/example', exampleRoute)
}