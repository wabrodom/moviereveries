require('dotenv').config()

const PORT = process.env.NODE_ENV === 'test'
  ? process.env.PORT_FOR_TEST
  : process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : process.env.PORT_FOR_DEV


const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_FOR_DEV

const JWT_SECRET= process.env.JWT_SECRET

const IS_NOT_PRODUCTION =  process.env.NODE_ENV !== 'production'

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  IS_NOT_PRODUCTION,
}