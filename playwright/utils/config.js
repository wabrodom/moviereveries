require('dotenv').config()

const IS_TEST_CI =  process.env.NODE_ENV === 'testci'

const BACKEND_ENDPOINT = process.env.NODE_ENV === 'testci' 
  ? 'http://localhost:4002/'
  : 'http://localhost:8888/api/api'

module.exports = {
  IS_TEST_CI,
  BACKEND_ENDPOINT,
}