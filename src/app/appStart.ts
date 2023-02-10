import { Application } from 'express'
const { env: { CUSTOM_PORT, APP_NAME, NODE_ENV } } = process
import logger from '../logger'
import { returnEnvValues, returnRoutes } from './appInfo'
import cronJobs from '../tasks/cron'

export default async (app: Application): Promise<void> => {
  // Only start the server if not in test mode
  if (NODE_ENV !== 'test') {
    try {
      app.listen(CUSTOM_PORT, async () => {
        logger.info(`${APP_NAME}: Magic happens on Port ${CUSTOM_PORT}`)
        logger.info(`${APP_NAME}: App running in ${NODE_ENV} mode`)
        logger.info(`${APP_NAME}: Started with the following environment variables \n${returnEnvValues().join('\n')}`)
        logger.info(`${APP_NAME}: Started with the following routes \n${returnRoutes(app).join('\n')}`)

        // Initiate cron jobs
        cronJobs()
      })
    } catch (err) {
      logger.error(`Unable to create app: ${err}`)
    }
  }
}