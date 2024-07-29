const { GraphQLError } = require('graphql')
// const { gql } = require('apollo/server')
const jwt =require('jsonwebtoken')
const { bcrypt, bcryptVerify } = require('hash-wasm')
const crypto = require('crypto')

const User = require('../models/User')
const config = require('../utils/config')

const typeDef = `
  extend type Query {
    me: User
    meFull: FullUser
    allUser: [ExposableUser]!
    userSavedMovieList: [MovieList]!
  }

  extend type Mutation { 
    createUser(
      username: String!
      name: String!
      favoriteGenre: String!
      password: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    changeFavoriteGenre(genre: String!): String!

    clearUser: Int!
  }

  interface BasedUser {
    name: String
    favoriteGenre: String!
  }

  type ExposableUser implements BasedUser {
    name: String
    favoriteGenre: String!
  }

  type User implements BasedUser {
    username: String!
    name: String
    favoriteGenre: String!

    movieLists: [String]!
    id: ID!
  }

  type FullUser implements BasedUser {
    username: String!
    name: String
    favoriteGenre: String!
 
    movieLists: [MovieList]!
    saveLists: [MovieList]!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },

    meFull: async (root, args, { currentUser }) => {
      const userFullPopulated = await User.findById(currentUser.id).
        populate('movieLists').populate('saveLists')

      return userFullPopulated
    },


    allUser: async () => {
      const users =  await User.find({}, {
        name: 1,
        favoriteGenre:1,
      })
      return users
    },

    userSavedMovieList: async (root, args, { currentUser }) => {
      // const userToPopulate =  await User.findById(currentUser.id).populate('saveLists')
      // return userToPopulate

      // if ( !currentUser) { 
      //   throw new GraphQLError('not authenticated', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT'
      //     }
      //   })
      // }

      await currentUser.populate({
        path: 'saveLists',
        options: { sort : { updatedAt: -1 }}
      })

      const arrayOfObject = currentUser.saveLists

      return arrayOfObject
    },

  },

  Mutation: {
    createUser: async (root, args) => {
      const password = args.password

      const salt = crypto.randomBytes(16);

      const passwordHash = await bcrypt({
        password: password,
        salt, // salt is a buffer containing 16 random bytes
        costFactor: 11,
        outputType: 'encoded', // return standard encoded string containing parameters needed to verify the key
      });

      // const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({ 
        username: args.username,
        name: args.username,
        favoriteGenre: args.favoriteGenre || 'mystery',
        passwordHash: passwordHash,
        movies: [],
      })
    
      return user.save().catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      })

    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user) {
        throw new GraphQLError('User not found' , {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const passwordCorrect = await bcryptVerify({
        password: args.password,
        hash: user.passwordHash
      })
      
      if (!passwordCorrect) {
        throw new GraphQLError('wrong credentials' , {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      const userForToken = { username: user.username, id: user._id}
      return { value: jwt.sign(userForToken, config.JWT_SECRET)}
    },

    changeFavoriteGenre: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
    
      const user = await User.findById(currentUser.id)
      user.favoriteGenre = args.genre
      
      await user.save()
      return user.favoriteGenre
    },

    clearUser: async() => {
      await User.deleteMany({})
      return User.collection.countDocuments()
    },
  }

}

module.exports = { typeDef,  resolvers }


/*
  remove  passwordHash: String!
    type User implements BasedUser {
      username: String!
      name: String
      favoriteGenre: String!
      passwordHash: String!
      movieLists: [String]!
      id: ID!
    }

*/