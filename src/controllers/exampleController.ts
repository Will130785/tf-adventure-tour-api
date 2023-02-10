import { Request, Response, NextFunction } from 'express'
import { collections } from '../app/dbConnect'
import Example from '../models/exampleModel'
import logger from '../logger'
const { env: { APP_NAME } } = process

const getExample = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const name = req.params.name
  try {
    const query = { name: name }
    const example = (await collections.example?.findOne(query)) as Example

    if (example) {
      return res.status(200).send(example)
    } else {
      return res.status(401).json({
        msg: 'No records found'
      })
    }
  } catch (err) {
    logger.error(`${APP_NAME}: getExample error - ${err}`)
    return res.status(400).send(err)
  }
}

const getAllExample = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const example = (await collections.example?.find({}).toArray()) as Example[]
    
    if (example) {
      return res.status(200).send(example)
    } else {
      logger.error(`${APP_NAME}: getAllExample error retrieving records`)
      return res.status(401).send('Error retrieving records')
    }
  } catch (err) {
    logger.error(`${APP_NAME}: getExample error - ${err}`)
    return res.status(400).send(err)
  }
}

const postExample = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  // Get data from req
  const data = req.body
  try {
    const newExample = data as Example
    const result = await collections.example?.insertOne(newExample)

    if (result) {
      return res.status(201).send(`Successfully created new example with id ${result.insertedId}`)
    } else {
      logger.error(`${APP_NAME}: postExample error adding example`)
      return res.status(401).send('Error adding example')
    }
  } catch (err) {
    logger.error(`${APP_NAME}: postExample error - ${err}`)
    return res.status(400).send(err)
  }
}

const putExample = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const name = req.params.name
  const data = req.body as Example
  try {
    const query = { name: name }

    const result = await collections.example?.updateOne(query, { $set: data })

    if (result) {
      return res.status(201).send(`Successfully updated example`)
    } else {
      logger.error(`${APP_NAME}: putExample error updating example`)
      return res.status(401).send('Error updating example')
    }
  } catch (err) {
    logger.error(`${APP_NAME}: putExample error - ${err}`)
    return res.status(400).send(err)
  }
}

const deleteExample = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const name = req.params.name
  try {
    const query = { name: name }
  
    const result = await collections.example?.deleteOne(query)
  
    if (result && result.deletedCount) {
      return res.status(201).send(`Successfully removed example with name ${name}`)
    } else {
      logger.error(`${APP_NAME}: putExample error deleting example with name ${name}`)
      return res.status(401).send(`Error deleting example with name ${name}`)
    }
  } catch (err) {
    logger.error(`${APP_NAME}: deleteExample error - ${err}`)
    return res.status(400).send(err)
  }
}

export {
  getExample,
  getAllExample,
  postExample,
  putExample,
  deleteExample
}