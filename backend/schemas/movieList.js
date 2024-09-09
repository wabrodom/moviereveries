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

    removeMovieList(listId: String!): MovieList
    saveMovieList(listId: String!): MovieList
    unSaveMovieList(listId: String!): MovieList
    
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
    deletedByUser: Boolean
    savedUser: [String]!
  }
`

const resolvers ={
  Query: {
    MovieListCount: async() => MovieList.collection.countDocuments(),
  
    //  no populate for now, just need all text
    //  1 primary title, 2 list description 3 reason on each movie
    allMovieLists: async () => {
      const query = MovieList.where({ deletedByUser: false }) // prior object will be undefined
      const allLists = await query.find().sort({ updatedAt: -1 })
        // .populate('user')
        // .populate({
        //   path: 'list.movieId',
        //   model: 'MovieImdb'
        // })
      return allLists
    },

    findMovieListById: async (root, args) => {
      try {
        const foundList = await MovieList.findById(args.id)
        return foundList
      } catch(error) {
        throw new GraphQLError('The movie list ID is not found.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.list,
            error
          }
        })
      }
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

      console.log(currentUser)

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

    removeMovieList: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const listToRemove = await MovieList.findById(args.listId)
        if (listToRemove.user.toString() !== currentUser._id.toString()) {
          throw new GraphQLError('Not authorized. Other user cannot remove the list', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
        
        listToRemove.deletedByUser = true
        await listToRemove.save()

        // if nobody save this list anymore, then remove it
        // will make frontend check if deleted true, and no one saved it. To delete Again
        if (listToRemove.savedUser.length === 0) {
          const foundId  = currentUser.movieLists.find(e => e.toString() === args.listId)
          const filter = currentUser.movieLists.filter(id => id !== foundId)
          currentUser.movieLists = filter
          await MovieList.findByIdAndDelete(args.listId)
          await currentUser.save()
        }
        
  
        return listToRemove

      } catch (error) {
        throw new GraphQLError('failed to remove your List', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.listId,
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
        movieListToSave.savedUser.push(currentUser.id)
        await movieListToSave.save()
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


    unSaveMovieList: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      // find Movielist from its listId, not found -> send meaningful error
      const movieLisToUnSave = await MovieList.findById(args.listId)
      if (movieLisToUnSave === null) {
        throw new GraphQLError('movie list id not found', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (movieLisToUnSave.user.toString() === currentUser.id) {
        throw new GraphQLError('you create this movie list, you could remove this list', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }


      const foundId  = currentUser.saveLists.find(e => e.toString() === args.listId)
      if (!foundId) {
        throw new GraphQLError('The movie list is not in your list', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        // filter out this objectId
        const filter = currentUser.saveLists.filter(id => id !== foundId)
        currentUser.saveLists = filter
        await currentUser.save()

        return movieLisToUnSave
      } catch (error) {
        throw new GraphQLError('failed to unsave to your "Saved List"', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.listId,
            error
          }
        })
      }
      

 
    },


  }
}

module.exports = { typeDef, resolvers }