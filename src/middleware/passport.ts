// Example passport configuration for JWT
import passport from 'passport'
import passportJWT from 'passport-jwt'
import Example from '../models/exampleModel'
import { collections } from '../app/dbConnect'
import { ObjectId } from 'mongodb'

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const { CUSTOM_JWT_SECRET } = process.env

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: CUSTOM_JWT_SECRET
}, async (jwtPayload, done) => {
  if (!jwtPayload) {
    return done('No user object')
  } else if (jwtPayload.id) {
    const query = { _id: new ObjectId(jwtPayload.id) }
    const user = (await collections.example?.findOne(query)) as Example
    if (user) {
      return done(null, user)
    } else {
      return done('Error')
    }
  } else {
    return done('Invalid user object')
  }
}))
