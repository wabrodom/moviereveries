const DirectorImdb = require('../models/DirectorImdb')
const Genre = require('../models/Genre')
const MovieImdb = require('../models/MovieImdb')
const MovieList = require('../models/MovieList')
const User = require('../models/User')


const typeDef = `
  extend type Mutation {
    clearDirectorImdb: Int!
    clearGenre: Int!
    clearMovieImdb: Int!
    clearMovieList: Int!
    clearUser: Int!
  }
`

const resolvers = {
  Mutation: { 
    clearDirectorImdb: async() => {
      await DirectorImdb.deleteMany({})
      return DirectorImdb.collection.countDocuments()
    },

    clearGenre: async() => {
      await Genre.deleteMany({})
      return Genre.collection.countDocuments()
    },

    clearMovieImdb: async() => {
      await MovieImdb.deleteMany({})
      return MovieImdb.collection.countDocuments()
    },

    clearMovieList: async() => {
      await MovieList.deleteMany({})
      return MovieList.collection.countDocuments()
    },

    clearUser: async() => {
      await User.deleteMany({})
      return User.collection.countDocuments()
    },
  }
}

module.exports = { typeDef, resolvers }