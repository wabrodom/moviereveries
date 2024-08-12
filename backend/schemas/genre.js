const { GraphQLError } = require('graphql')
const Genre = require('../models/Genre')
const MovieImdb = require('../models/MovieImdb')

const typeDef = `
  extend type Query {
    genreCount: Int!
    allGenres: [Genre]!
  }

  extend type Mutation {
    addGenre(lowText: String!): Genre
    editGenre(oldLowText: String!, newLowText: String!): Genre
    fillGenres: [Genre]!
    deleteGenre(lowText: String!): Genre
  }

  type Genre {
    genre: String!
    id: ID!
  }
`

const resolvers ={
  Query: {
    genreCount: async() => Genre.collection.countDocuments(),
  
    allGenres: async () => {
      const allGeneres = await Genre.find({})
      return allGeneres
    },

  },
  Mutation: {
    addGenre: async (root, args, { currentUser }) => {
      // // if it works. will check user token
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      const genreIsExist = await Genre.findOne( { genre: args.lowText })
    
      if (genreIsExist) {
        return null
      }

      const newGenre = new Genre({ genre: args.lowText })
      try {
        await newGenre.save()
        return newGenre
      } catch(error) {
        throw new GraphQLError('failed to save a new genre', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.lowText
          }
        })
      }

    },

    editGenre: async (root, args, { currentUser }) => {
      // // if it works. will check if user have a valid token
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const genreToEdit = await Genre.findOne( { genre: args.oldLowText })
      if (genreToEdit === null) {
        return null
      }
      try {
        genreToEdit.genre = args.newLowText
        await genreToEdit.save()

        return genreToEdit
      } catch(error) {
        throw new GraphQLError('failed to edit genre', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.newLowText
          }
        })
      }
    },

    fillGenres: async() => {
      const allMovies = await MovieImdb.find({})

      const allGenresHelper = (movies) => {
        const set = new Set()
        for (const movie of movies) {
          const currentGenres = movie.genres // array of string
          if (Array.isArray(currentGenres)){
            currentGenres.forEach(elem => set.add(elem))
          } else if (typeof currentGenres === 'string') {
            set.add(currentGenres)
          }
        }
        return [...set]
      }

      const genresResult = allGenresHelper(allMovies)
      try {
        for (const genre of genresResult) {
          const genreLowerCase = genre.toLowerCase()
          const toAddGenre = await Genre.findOne({ genre: genreLowerCase })
          if (toAddGenre === null) {
            await Genre.create({ genre : genreLowerCase })
          }
        }
        return await Genre.find({})

      } catch (error) {
        throw new GraphQLError('failed to save some genre to genres', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
    },

    deleteGenre: async (root, args, { currentUser }) => {
      // // if it works. will check valid user
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const genreToDelete = await Genre.findOneAndDelete({ genre: args.lowText })
        return genreToDelete
      } catch(error) {
        throw new GraphQLError('failed to delete genre', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.newLowText
          }
        })
      }
    },

  }
}

module.exports = { typeDef, resolvers }