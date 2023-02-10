import dotenv from 'dotenv'
dotenv.config({
  path: '.env.test'
})

const { env: { CUSTOM_DB_NAME } } = process

import request from 'supertest'
import testData from '../../data/exampleData'
import * as mongoDB from 'mongodb'
import express from 'express'
const app = express()
import application from '../../app/index'

jest.mock('../../logger', () => ({
  info: () => {},
  error: () => {},
  debug: () => {}
}))

let client: mongoDB.MongoClient

beforeAll(async () => {
  client = await application(app)
})

describe ('Example route tests', () => {
  it ('Checks we recieve a 201 status code when adding new example', async () => {
    const expected = 201

    const result = await request(app).post('/example/test-route')
    .send(testData[0])

    expect(result.statusCode).toBe(expected)
  })
  it ('Checks we recieve a 200 status code when getting all examples', async () => {
    const expected = 200

    const result = await request(app).get('/example/test-route')

    expect(result.statusCode).toBe(expected)
  })
  it ('Checks we recieve a 200 status code when getting one examples', async () => {
    const expected = 200

    const result = await request(app).get('/example/test-route/Example Name 1')

    expect(result.statusCode).toBe(expected)
  })
  it ('Checks we recieve a 201 status code when updating example', async () => {
    const expected = 201

    const result = await request(app).put('/example/test-route/Example Name 1')
    .send(testData[1])

    expect(result.statusCode).toBe(expected)
  })
  it ('Checks we recieve a 201 status code when deleteing example', async () => {
    const expected = 201

    const result = await request(app).delete('/example/test-route/Example Name 2')

    expect(result.statusCode).toBe(expected)
  })
})

afterAll(async () => {
  const db: mongoDB.Db = client.db(CUSTOM_DB_NAME)
  await db.dropDatabase()
  client.close()
})