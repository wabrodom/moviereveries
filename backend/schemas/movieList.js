const { GraphQLError } = require('graphql')
const MovieList = require('../models/MovieList')

const typeDef = `
  extend type Query {
    MovieListCount: Int!
    allMovieLists: [MovieList]!
    findMovieListById(id: String!): MovieList
  }

  extend type Mutation {
    addMovieList(
      listName: String!
      description: String!
      list: [ListItemInput]!
    ): MovieList

    saveMovieList(listId: String!): MovieList

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
    createdAt: String
    updatedAt: String
  }
`

const resolvers ={
  Query: {
    MovieListCount: async() => MovieList.collection.countDocuments(),
  
    //  no populate for now, just need all text
    //  1 primary title, 2 list description 3 reason on each movie
    allMovieLists: async () => {
      const allLists = await MovieList.find({}).sort({ updatedAt: -1 })
        // .populate('user')
        // .populate({
        //   path: 'list.movieId',
        //   model: 'MovieImdb'
        // })
      return allLists
    },

    findMovieListById: async (root, args) => {
      const foundList = await MovieList.findById(args.id)
      return foundList
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

        currentUser.movieLists.push(newMovieList._id)
        
        await currentUser.save()
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

    saveMovieList: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      // find Movielist from its listId, not found -> send meaningful error
      const movieListToSave = await MovieList.findById(args.listId)
      if (movieListToSave === null) {
        throw new GraphQLError('movie list id not found', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (movieListToSave.user.toString() === currentUser.id) {
        throw new GraphQLError('you create this movie list', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (currentUser.saveLists.includes(movieListToSave._id)) {
        throw new GraphQLError('this movie list already in your list', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        // just append to the array of ObjectId 
        currentUser.saveLists.push(movieListToSave._id)
        await currentUser.save()

        return movieListToSave
      } catch (error) {
        throw new GraphQLError('failed to save to your "Save List"', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.listId,
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