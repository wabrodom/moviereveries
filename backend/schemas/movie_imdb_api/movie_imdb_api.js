

const typeDef = `
  extend type Query {
    title(id: ID!): MovieByTitleById 
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

const resolvers = {
  Query: {
    title: async (_root, { id }) => {
      const { titleById } = await import('./movie_imdb_api_titleById.mjs')
      return await titleById(id)
    }
  },
}

module.exports = { typeDef, resolvers }
