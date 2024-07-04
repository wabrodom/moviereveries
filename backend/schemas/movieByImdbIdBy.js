const { GraphQLError } = require('graphql')
const DirectorNew = require('../models/DirectorNew')
const MovieByImdbId = require('../models/MovieByImdbId')


const typeDef =`
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

  type MovieByTitleById {
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
  }

  extend type Query {
    movieByImdbCount: Int!
    findMoviesByDirectorImdbId(directorId: String): [MovieByTitleById]!
  }

  extend type Mutation {
    addmovieByImdbId(
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
    ): MovieByTitleById!

    clearmovieByImdbId: Int!
    clearDirectorNew: Int!
  }
`

const resolvers = {
  Query: {
    movieByImdbCount: async () => MovieByImdbId.collection.countDocuments(),

    findMoviesByDirectorImdbId: async (root, args) => {
      if (!args.directorId) return [] 

      const directorMoviesPopulated = await MovieByImdbId.find({ directorsAddedUse: args.directorId }).populate('directorsAddedUse')
        return directorMoviesPopulated
    }
  },


  Mutation: {
    addmovieByImdbId: async (root, args) => {
      // if ( !currentUser) { 
      //   throw new GraphQLError('not authenticated', {
      //     extensions: {
      //       code: 'BAD_USER_INPUT'
      //     }
      //   })
      // }

      const duplicatedImdbId = await MovieByImdbId.findOne({ imdb_id: args.id })
      if (duplicatedImdbId) {
        throw new GraphQLError('movieByImdbId name must be unqiue', {
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
      
      const movieByImdbId = new MovieByImdbId({
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
      /* 
        // too complicated for now
        for (const name of directorsAdded) {
          let director = await DirectorNew.find({ nameId: director.name.id })

          if ( !director ) {
            director = new DirectorNew({ 
              name, 
              movies: [movieByImdbId.id] ,
              moviesImdb: [imdb_id] 
            })
          } else if (!director.movies.includes(imdb_id)) {
            director.movies = director.movies.concat(movieByImdbId.id)
            director.movies = director.moviesImdb.concat(imdb_id)
          }
          
          await director.save()
        }
      */
      

      for (const obj of directorsAddedUse) {
        const { nameId, display_name } = obj
        let director = await DirectorNew.findOne({ nameId: nameId })
  
        if (director === null) {
          director = new DirectorNew({ 
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

      console.log(movieByImdbId)
      const populated = movieByImdbId.populate('directorsAddedUse')
      console.log(populated)
      return populated
    },
    
    clearmovieByImdbId: async() => {
      await MovieByImdbId.deleteMany({})
      return MovieByImdbId.collection.countDocuments()
    },
    clearDirectorNew: async() => {
      await DirectorNew.deleteMany({})
      return DirectorNew.collection.countDocuments()
    },
  },

}

module.exports = { typeDef, resolvers }