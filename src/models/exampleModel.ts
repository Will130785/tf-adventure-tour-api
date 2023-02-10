import { ObjectId } from 'mongodb'

export default interface Example {
  name: string,
  age: number,
  info: { info1: string, info2: string },
  hobbies: string[],
  _id?: ObjectId
}