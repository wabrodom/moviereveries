require('dotenv').config()

const IS_TEST_LOCAL =  process.env.NODE_ENV === 'testlocal'

const BACKEND_ENDPOINT = process.env.NODE_ENV === 'testlocal' 
  ? 'http://localhost:8888/api/api'
  : 'http://localhost:4002/api'

module.exports = {
  IS_TEST_LOCAL,
  BACKEND_ENDPOINT,
}