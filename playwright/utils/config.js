require('dotenv').config()

const IS_TEST_LOCAL =  process.env.NODE_ENV === 'testlocal'

module.exports = {
  IS_TEST_LOCAL,
}