const { GraphQLError } = require('graphql')
const DirectorNew = require('../models/DirectorNew')
const MovieByImdbId = require('../models/MovieByImdbId')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDef =`
  type Rating {
    aggregate_rating: Float
    votes_count: Int
  }
  input RatingInput {
    aggregate_rating: Float
    votes_count: Int
  }

  type SpokenLanguage {
    code: String
    name: String
  }
  input SpokenLanguageInput {
    code: String
    name: String
  }

  type Poster {
    url: String
  }
  input PosterInput {
    url: String
  }

  type OriginCountry {
    code: String
    name: String
  }
  input OriginCountryInput {
    code: String
    name: String
  }

  type CriticReview {
    review_count: Int
    score: Float
  }
  input CriticReviewInput {
    review_count: Int
    score: Float
  }

  type Avatar {
    url: String
    width: Int
    height: Int
  }
  type AvatarInput {
    url: String
    width: Int
    height: Int
  }

  type Person {
    id: ID!
    display_name: String
    avatars: [Avatar]
  }
  type PersonInput {
    id: ID!
    display_name: String
    avatars: [Avatar]
  }

  type Credit {
    name: Person
  }
  type CreditInput {
    name: Person
  }


  type MovieByTitleById {
    imdb_id: ID!
    original_title: String
    primary_title: String
    genres: [String]
    plot: String
    is_adult: Boolean
    rating: Rating
    runtime_minutes: Int
    spoken_languages: [SpokenLanguage]
    start_year: Int
    end_year: Int
    type: String
    posters: [Poster]
    origin_countries: [OriginCountry]
    critic_review: CriticReview
    credits(first: Int, categories: [String!]): [Credit]
    directorsAdded: [Credit]

  }

  extend type Mutation {
    addMovieByImdbId(
      imdb_id: String!
      original_title: String
      primary_title: String
      genres: [String]
      plot: String
      is_adult: Boolean
      rating: RatingInput
      runtime_minutes: Int
      spoken_languages: [SpokenLanguageInput]
      start_year: Int
      end_year: Int
      type: String
      posters: [PosterInput]
      origin_countries: [OriginCountryInput]
      critic_review: CriticReviewInput
      directorsAdded: [CreditInput]
    ): MovieByImdbId!

    clearmovieByImdbId: Int!
  }
`

const resolvers = {
  // MovieByTitleById: {
  //   directorsAdded : (root) => {
  //     return root.directorsAdded
  //   },
  //   writersAdded: (root) => {
  //     return root.writersAdded
  //   }
  // },
  

  Mutation: {
    addmovieByImdbId: async (root, args, { currentUser }) => {
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

      const {
        id,
        original_title,
        primary_title,
        genres,
        plot,
        is_adult,
        rating,
        runtime_minutes,
        spoken_languages,
        start_year,
        end_year,
        type,
        posters,
        origin_countries,
        critic_review,
        directorsAdded,
        writersAdded
      } = args
      const movieByImdbId = new MovieByImdbId({
        imdb_id: id,
        original_title,
        primary_title,
        genres,
        plot,
        is_adult,
        rating,
        runtime_minutes,
        spoken_languages,
        start_year,
        end_year,
        type,
        posters,
        origin_countries,
        critic_review,
        directorsAdded,
        writersAdded
       })
       try {
        await movieByImdbId.save()
        console.log('Movie saved successfully');
      } catch (error) {
        console.error('Error saving movie:', error);
      }

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

      const populated = await movieByImdbId.populate('directorsAdded')
      console.log('In the list author', populated)
      return movieByImdbId
    },
    
    clearmovieByImdbId: async() => {
      await MovieByImdbId.deleteMany({})
      return MovieByImdbId.collection.countDocuments()
    },
  },

}

module.exports = { typeDef, resolvers }