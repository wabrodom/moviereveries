const { GraphQLError } = require('graphql')
const DirectorImdb = require('../models/DirectorImdb')
const MovieImdb = require('../models/MovieImdb')
const User = require('../models/User')
const Genre = require('../models/Genre')

const { PubSub } = require('graphql-subscriptions');
const movieImdbPubsub = new PubSub()

const typeDef =`
  extend type Query {
    movieImdbCount: Int!
    allMoviesImdb(director: String, genre: String): [MovieImdb]!
    findMoviesImdb(text: String): [MovieImdb]!
    findMoviesImdbByImdb(imdb_id: String): MovieImdb
    findMoviesImdbByDirectorId(directorId: String): [MovieImdb]!
  }

  extend type Mutation {
    addMovieImdb(
      imdb_id: String!
      original_title: String
      primary_title: String
      genres: [String]
      plot: String
      is_adult: Boolean
      runtime_minutes: Int
      start_year: Int
      end_year: Int
      type: String
      postersUse: [PosterInput]
      directorsAddedUse: [DirectorsAddedUseInput]
    ): MovieImdb!

    
  }

  extend type Subscription {
    movieImdbAdded: MovieImdb!
  }
  
  input PosterInput {
    url: String
  }
  type PosterUse {
    url: String
  }

  input DirectorsAddedUseInput {
    nameId: String
    display_name: String
  }

  type DirectorsAddedUse {
    nameId: String!
    display_name: String!
    movies: [ID]
    moviesImdb: [String]
  }


  type MovieImdb {
    imdb_id: ID!
    original_title: String
    primary_title: String
    genres: [String]
    plot: String
    is_adult: Boolean

    runtime_minutes: Int

    start_year: Int
    end_year: Int
    type: String
    postersUse: [PosterUse]

    directorsAddedUse: [DirectorsAddedUse]
    id: ID!
  }


`

const resolvers = {
  Query: {
    movieImdbCount: async () => MovieImdb.collection.countDocuments(),

    allMoviesImdb: async (root, args) => {

      if (!args.director && !args.genre) {
        const allMoviesPopulated = await MovieImdb.find({}).populate('directorsAddedUse')
        return allMoviesPopulated
      }
      if (args.director && !args.genre) {
          const foundDirector = await DirectorImdb
            .findOne({ display_name : { "$regex": args.director , "$options": "i" } })
          if (foundDirector === null) {
            return []
          }
        const directorMovies = await MovieImdb
          .find({ directorsAddedUse : foundDirector._id })
          .populate('directorsAddedUse')
        return directorMovies
      }
      if (!args.director && args.genre ) {
        const matchGenre = await MovieImdb
          .find({ genres: 
            { "$regex": args.genre , "$options": "i" } 
          })
          .populate('directorsAddedUse')
        return matchGenre
      }

      const matchDirector = await DirectorImdb.findOne({ display_name : args.director })
      const matchDirectorAndGenre = await MovieImdb
        .find({ directorsAddedUse : matchDirector._id })
        .find({ genres: args.genre })
        .populate('directorsAddedUse')
      
      return matchDirectorAndGenre
    },

    findMoviesImdb: async (root, args) => {
      if (!args.text) {
        const allMoviesImdbPopulated = await MovieImdb.find({}).populate('directorsAddedUse')
        return allMoviesImdbPopulated
      }

      const foundMovies = await MovieImdb
        .find({ 
          primary_title: 
            { "$regex": args.text , "$options": "i" } 
        })
        .populate('directorsAddedUse')

      if (foundMovies.length === 0) {
        const findOriginalTitle = await MovieImdb
          .find({ 
            original_title: 
              { "$regex": args.text , "$options": "i" } 
          })
          .populate('directorsAddedUse')
        return findOriginalTitle
      }

      return foundMovies
    },

    findMoviesImdbByImdb: async (root, args) => {
      const FoundMovie = await MovieImdb
        .findOne({ imdb_id: args.imdb_id })
        .populate('directorsAddedUse')
      return FoundMovie
    },

    findMoviesImdbByDirectorId: async (root, args) => {
      if (!args.directorId) return [] 

      const directorMoviesPopulated = await MovieImdb
        .find({ directorsAddedUse: args.directorId })
        .populate('directorsAddedUse')

      return directorMoviesPopulated
    }
  },


  Mutation: {
    addMovieImdb: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const duplicatedImdbId = await MovieImdb.findOne({ imdb_id: args.imdb_id })
      if (duplicatedImdbId) {
        throw new GraphQLError('the movie already in the database', {
          extensions: {
            code: 'BAD_USER_INPUT',
            inValidArgs: args.id
          }
        })
      }
        /*
            imdb_id: ID!
            original_title: String
            primary_title: String
            genres: [String]
            plot: String
            is_adult: Boolean

            runtime_minutes: Int

            start_year: Int
            end_year: Int
            type: String
            postersUse: [String]

            directorsAddedUse: [String!]
        
         */
      const {
        imdb_id,
        original_title,
        primary_title,
        genres,
        plot,
        is_adult,

        runtime_minutes,
     
        start_year,
        end_year,
        type,
        postersUse,

        directorsAddedUse,
  
      } = args
      
      const movieByImdbId = new MovieImdb({
        imdb_id,
        original_title,
        primary_title,
        genres,
        plot,
        is_adult,
      
        runtime_minutes,
       
        start_year,
        end_year,
        type,
        postersUse,
    
        directorsAddedUse: [],

      })

      try {
        await movieByImdbId.save()
      } catch (error) {
        console.error('Error saved to get id: ', error);
      }

      for (const genre of genres) {
        const genreLowerCase = genre.toLowerCase()
        const toAddGenre = await Genre.findOne({ genre: genreLowerCase })
        if (toAddGenre === null) {
          await Genre.create({ genre : genreLowerCase })
        }
      }

      for (const obj of directorsAddedUse) {
        const { nameId, display_name } = obj
        let director = await DirectorImdb.findOne({ nameId: nameId })
  
        if (director === null) {
          director = new DirectorImdb({ 
            nameId: nameId,
            display_name: display_name, 
            movies: [movieByImdbId.id],
            moviesImdb: [imdb_id] 
          })

          try {
            await director.save()
          } catch(error) {
            console.error('Error saving director:', error);
          }
          movieByImdbId.directorsAddedUse.push(director._id)
        } else if (director.moviesImdb.includes(imdb_id) === false) {
          // found director && director don't have this movieImdb id in his/her object yet
          director.movies = director.movies.concat(movieByImdbId.id)
          director.moviesImdb = director.moviesImdb.concat(imdb_id)

          movieByImdbId.directorsAddedUse.push(director._id)

          await director.save()
        }
        
      }
      
      try {
        await movieByImdbId.save()
      } catch (error) {
        console.error('Error saving movie:', error);
      }

      // console.log(movieByImdbId)
      const populated = movieByImdbId.populate('directorsAddedUse')
      // console.log(populated)

      movieImdbPubsub.publish('MOVIE_IMDB_ADDED', { movieImdbAdded: populated }) 

      return populated
    },
    

  },

  Subscription: {
    movieImdbAdded: {
      subscribe: () => movieImdbPubsub.asyncIterator('MOVIE_IMDB_ADDED')
      // return AsyncIterator obj, its name is 'MOVIE_IMDB_ADDED'. 
      // the job is to listen to "MOVIE_IMDB_ADDED event label"
      // or it save info about client that do the  subscriptions
    }
  }
}

module.exports = { typeDef, resolvers }