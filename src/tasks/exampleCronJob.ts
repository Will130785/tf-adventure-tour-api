import schedule from 'node-schedule'
import logger from '../logger'
const { env: { APP_NAME } } = process 

const cronJobs = async (): Promise<void> => {
  const exampleCron = schedule.scheduleJob('00 48 14 * * *', () => {
    logger.info(`${APP_NAME}: Running example cron job`)
  })
}

export default cronJobs