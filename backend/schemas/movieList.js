const { GraphQLError } = require('graphql')
const MovieList = require('../models/MovieList')

const typeDef = `
  extend type Query {
    MovieListCount: Int!
    allMovieLists: [MovieList]!
  }

  extend type Mutation {
    addMovieList(
      listName: String!
      description: String!
      list: [ListItemInput]!
    ): MovieList
    clearMovieList: Int!
  }

  type ListItem {
    primary_title: String
    original_title: String
    movieId: ID!
    imdb_id: String!
    impression: String!
  }

  input ListItemInput {
    primary_title: String
    original_title: String
    movieId: ID!
    imdb_id: String!
    impression: String!
  }

  type MovieList {
    listName: String!
    description: String!
    list: [ListItem]!
    id: ID!
  }
`

const resolvers ={
  Query: {
    MovieListCount: async() => MovieList.collection.countDocuments(),
  
    //  no populate for now, just need all text
    //  1 primary title, 2 list description 3 reason on each movie
    allMovieLists: async () => {
      const allLists = await MovieList.find({})
        // .populate('user')
        // .populate({
        //   path: 'list.movieId',
        //   model: 'MovieImdb'
        // })
      return allLists
    },
  },

  Mutation: {
    addMovieList: async (root, args, { currentUser }) => {
      // if it works. will check user token
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      console.log('currentUser' , currentUser)
      
      const listNameDuplicate = await MovieList.findOne( { listName: args.listName })
    
      if (listNameDuplicate) {
        return null
      }
      // make sure type of args.list = ListItemInput
      const newMovieList = new MovieList({
        listName: args.listName,
        description: args.description,
        list: args.list,
        user: currentUser._id
      })

      try {
        await newMovieList.save()
        console.log(JSON.stringify(newMovieList, null,2 ))
        return newMovieList
      } catch(error) {
        throw new GraphQLError('failed to save a new movie list', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.list,
            error
          }
        })
      }

    },

    clearMovieList: async() => {
      await MovieList.deleteMany({})
      return MovieList.collection.countDocuments()
    }
  }
}

module.exports = { typeDef, resolvers }