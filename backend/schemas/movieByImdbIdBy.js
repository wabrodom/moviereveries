const { GraphQLError } = require('graphql')
const DirectorNew = require('../models/DirectorNew')
const User = require('../models/User')
const movieByImdbId = require('../models/movieByImdb')

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
    writersAdded: [Credit]
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
      writersAdded: [CreditInput]
    ): MovieByImdbId!

    clearmovieByImdbId: Int!
  }

  extend type Subscription {
    movieByImdbIdAdded: movieByImdbId!
  }
`

const resolvers = {
  MovieByTitleById: {
    directorsAdded : (root) => {
      return root.directors
    },
    writersAdded: (root) => {
      return root.writers
    }
  },
  

  Mutation: {
    addmovieByImdbId: async (root, args, { currentUser }) => {
      const { imdb_id, directorNames } = args
      if ( !currentUser) { 
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      for (const name of directorNames) {
        const duplicatedImdbId = await movieByImdbId.findOne({ imdb_id: imdb_id })
  
        if (duplicatedImdbId) {
          throw new GraphQLError('movieByImdbId name must be unqiue', {
            extensions: {
              code: 'BAD_USER_INPUT',
              inValidArgs: args.imdb_id
            }
          })
        }
  
        const foundDirector = await DirectorNew.find({ name: name })

        const postUser = await User.findById(currentUser._id)
  
        if ( !foundDirector ) {
          const newDirector = new DirectorNew({ name, movies: [imdb_id] })
          try {
            await newDirector.save()
          } catch (error) {
            throw new GraphQLError('new director name saved failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                inValidArgs: args.director,
                error
              }
            })
          }
  
          const movieByImdbId = new movieByImdbId({
             title: args.title,
             director: args.director,
             released: args.released,
             genres: args.genres,
             director: newDirector._id,
             user: currentUser._id
            })
  
          try {
            await movieByImdbId.save()
            newDirector.movieByImdbIds = newDirector.movieByImdbIds.concat(movieByImdbId._id)
            postUser.movieByImdbIds = postUser.movieByImdbIds.concat(movieByImdbId._id)
            await newDirector.save()
            await postUser.save()
          } catch (error) {
            throw new GraphQLError('save movieByImdbId failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                inValidArgs: args,
                error
              }
            })
          }
  
          const populated = await movieByImdbId.populate('director')
  
          pubsub.publish('movieByImdbId_ADDED', { movieByImdbIdAdded: populated })
  
          return populated
  
        }
  
        const movieByImdbId = new movieByImdbId({ ...args, director: foundDirector._id })
  
        try {
          await movieByImdbId.save()
          foundDirector.movieByImdbIds = foundDirector.movieByImdbIds.concat(movieByImdbId._id)
          postUser.movieByImdbIds = postUser.movieByImdbIds.concat(movieByImdbId._id)
          await foundDirector.save()
          await postUser.save()
        } catch (error) {
          throw new GraphQLError('save movieByImdbId falied, The movieByImdbId name is at least 5 characters', {
            extensions: {
              code: 'BAD_USER_INPUT',
              inValidArgs: args,
              error
            }
          })
        }
        
      }
      const populated = await movieByImdbId.populate('director')
      // console.log('In the list author', populated)
      return populated
    },
    
    clearmovieByImdbId: async() => {
      await movieByImdbId.deleteMany({})
      return movieByImdbId.collection.countDocuments()
    },
  },

  Subscription: {
    movieByImdbIdAdded: {
      subscribe: () => pubsub.asyncIterator('movieByImdbId_ADDED')
      // return AsyncIterator obj, its name is 'movieByImdbId_ADDED'. the job is to listen to "movieByImdbId_ADDED event label"
      // or it save info about client that do the  subscriptions
    }
  }

}

module.exports = { typeDef, resolvers }