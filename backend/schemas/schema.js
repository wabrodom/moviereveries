const { makeExecutableSchema } = require("@graphql-tools/schema")
const { merge } = require('lodash')
const { IS_NOT_PRODUCTION } = require('../utils/config')

const { typeDef: Genre, resolvers: genreResolvers } = require('./genre')
const { typeDef: User, resolvers: userResolvers } = require('./user')
const { typeDef: Movie_Omdb_Api_Fetched, resolvers: Movie_Omdb_Api_FetchedResolvers } = require('./movie_omdb_api')
const { typeDef: Movie_Imdb_Api_queried, resolvers: Movie_Imdb_Api_queriedResolvers } = require('./movie_imdb_api/movie_imdb_api')
const { typeDef: MovieImdb, resolvers: movieImdbResolvers } = require('./movieImdb')
const { typeDef: DirectorImdb, resolvers: directorImdbResolvers } = require('./directorImdb')
const { typeDef: MovieList, resolvers: movieListResolvers } = require('./movieList')

const { typeDef: TestAndDev, resolvers: TestAndDevResolvers } = require('./testing_and_dev')

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [ 
    Query, 
    Genre,
    User, 
    Movie_Omdb_Api_Fetched,
    Movie_Imdb_Api_queried,
    MovieImdb,
    DirectorImdb,
    MovieList,
    IS_NOT_PRODUCTION ? TestAndDev : ``,
  ],
  resolvers: merge(
    genreResolvers,
    userResolvers, 
    Movie_Omdb_Api_FetchedResolvers,
    Movie_Imdb_Api_queriedResolvers,
    movieImdbResolvers,
    directorImdbResolvers,
    movieListResolvers,
    IS_NOT_PRODUCTION ? TestAndDevResolvers : {},
  )
})

module.exports = schema



/* old old typeDefs
const typeDefs = `
  // type Director {
  //   name: String!
  //   born: Int
  //   movies: [Movie]
  //   movieCount: Int
  // }

  // type Movie {
  //   title: String!
  //   director: Director!
  //   released: Int!
  //   genres: [String!]!
  //   id: ID!
  // }

  // type User {
  //   username: String!
  //   favoriteGenre: String!
  //   id: ID!
  // }

  // type Token {
  //   value: String!
  // }

  type Query {
    // movieCount: Int!
    // directorCount: Int!
    // allMovies(director: String, genre: String): [Movie]!
    // allDirectors: [Director!]!
    // me: User
  }

  type Mutation {
    // addMovie(
    //   title: String!
    //   director: String!
    //   released: Int!
    //   genres: [String!]!
    // ): Movie!
    // editDirector(
    //   name: String!
    //   setBornTo: Int!
    // ): Director

    // createUser(
    //   username: String!
    //   favoriteGenre: String!
    // ): User

    // login(
    //   username: String!
    //   password: String!
    // ): Token

    clearMovie: Int!
    clearDirector: Int!
  }

  // type Subscription {
  //   movieAdded: Movie!
  // }

`


*/