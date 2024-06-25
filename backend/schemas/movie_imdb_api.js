const { GraphQLError } = require('graphql')

const typeDef = `
  extend type Query {
    titleById(titleIdid: ID!): MovieByTitleById 
  }

   type Rating {
    aggregate_rating: Float
    votes_count: Int
  }

  type SpokenLanguage {
    code: String
    name: String
  }

  type Poster {
    url: String
  }

  type OriginCountry {
    code: String
    name: String
  }

  type CriticReview {
    review_count: Int
    score: Float
  }

  type MovieByTitleById {
    id: ID!
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
  }
`

/*
  query Query($titleId: ID!) {
    title(id: $titleId) {
      id
      original_title
      primary_title
      genres
      plot
      is_adult
      rating {
        aggregate_rating
        votes_count
      }
      runtime_minutes
      spoken_languages {
        code
        name
      }
      start_year
      end_year
      type
      posters {
        url
      }
      origin_countries {
        code
        name
      }
      critic_review {
        review_count
        score
      }
    }
  }
*/

const resolvers = {
  Query: {

    Query: {
      title: async (root, { id }, { dataSources }) => {
        // Replace this with the actual data fetching logic
        // Example:
        // const response = await dataSources.movieAPI.getTitleById(id);
        // return response;
  
        // Mock response (as provided)
  
      }
    }



    directorCount: async() => Director.collection.countDocuments(),
  
    allDirectors: async () => {
      const allThedirectors = await Director.aggregate([
        {  
          $project: {
            name: 1,
            born: 1,
            movies: 1,
            movieCount: {$size:"$movies"},
            id: { $toString: "$_id" }
          } 
        }
      ])
  
      await Director.populate(allThedirectors, {path: 'movies'})
      return allThedirectors
    },

  },
}

module.exports = { typeDef, resolvers }