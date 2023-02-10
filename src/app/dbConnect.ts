import * as mongoDB from 'mongodb'
import logger from '../logger'
import { ICollection } from '../types/Mongo'
const { env: { CUSTOM_DB_CONNECT, CUSTOM_DB_NAME, CUSTOM_EXAMPLE_COLLECTION_NAME, APP_NAME, CUSTOM_COLLECTION_INTREPID_PRODUCT } } = process

export const collections: ICollection = {}

export const dbConnect = async (): Promise<mongoDB.MongoClient> => {
  // Create mongo client instance
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(CUSTOM_DB_CONNECT ?? '')
  // Connect to client
  await client.connect()
  // Connect to DB
  const db: mongoDB.Db = client.db(CUSTOM_DB_NAME)
  // Create collection - Add any collections below
  const exampleCollection: mongoDB.Collection = db.collection(CUSTOM_EXAMPLE_COLLECTION_NAME ?? '')
  const intrepidProductCollection: mongoDB.Collection = db.collection(CUSTOM_COLLECTION_INTREPID_PRODUCT ?? '')
  // Set on collections object that will be exported - add all collections to the collections object
  collections.example = exampleCollection
  collections.intrepidProduct = intrepidProductCollection
  
  logger.info(`${APP_NAME}: Connected to mongoDB ${CUSTOM_DB_CONNECT}/${CUSTOM_DB_NAME}`)
  // Return client so we can access connection from outside this function if needed
  return client
}