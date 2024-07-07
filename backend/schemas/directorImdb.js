const { GraphQLError } = require('graphql')
const DirectorImdb = require('../models/DirectorImdb')

const typeDef = `
  extend type Query {
    directorImdbCount: Int!
    allDirectorsImdb: [DirectorImdb]!
  }

  extend type Mutation {
    editDirectorImdb(
      name: String!
      setBornTo: Int!
    ): DirectorImdb
 
    clearDirectorImdb: Int!
  }

  type DirectorImdb {
    nameId: String!
    display_name: String!
    born: Int
    movies: [MovieImdb]!
    moviesImdb: [String]!
    movieCount: Int
    id: ID!
  }
`

const resolvers ={
  Query: {
    directorImdbCount: async() => DirectorImdb.collection.countDocuments(),
  
    allDirectorsImdb: async () => {
      const allThedirectors = await DirectorImdb.aggregate([
        {  
          $project: {
            nameId: 1,
            display_name: 1,
            born: 1,
            movies: 1,
            moviesImdb: 1,
            movieCount: {$size:"$movies"},
            id: { $toString: "$_id" }
          } 
        }
      ])
  
      await DirectorImdb.populate(allThedirectors, {path: 'movies'})
      return allThedirectors
    },

  },
  Mutation: {
    editDirectorImdb: async (root, args, { currentUser }) => {
      // if ( !currentUser) { 
      //   throw new GraphQLError('not authenticated', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT'
      //     }
      //   })
      // }
      
      const directorToEdit = await DirectorImdb.findOne( { display_name: args.name })
    
      if (!directorToEdit) {
        return null
      }
      // graphQL type defintion in Mutation is Int, it will check type first, if err below code will not run
      if (typeof args.setBornTo !== 'number') {
        throw new GraphQLError('the director birthyear must be a number', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.setBornTo
          }
        })
      }

      directorToEdit.born = args.setBornTo
      try {
        await directorToEdit.save()
      } catch(error) {
        throw new GraphQLError('failed to change birthyear of the director', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.setBornTo
          }
        })
      }

      return await DirectorImdb.populate(directorToEdit, {path: 'movies'})
    },

    clearDirectorImdb: async() => {
      await DirectorImdb.deleteMany({})
      return DirectorImdb.collection.countDocuments()
    }
  }
}

module.exports = { typeDef, resolvers }