const axios = require('axios');
require('dotenv').config();

const typeDef = `
  extend type Query {
    fetchMovies(title: String!, type: String, year: String): [MovieFetched]!
  }

  type MovieFetched {
    Title: String!,
    Year: String,
    imdbID: String,
    Type: String,
    Poster: String,
  }
`

const resolvers = {
  Query: {
    fetchMovies: async (root, args, { currentUser }) => {
      if ( !currentUser) { 
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const { title, type, year } = args;
      const OMDB_API_KEY = process.env.OMDB_API_KEY;

      const queryParams = new URLSearchParams({
        s: title,
        type: type,
        y: year,
        apikey: OMDB_API_KEY,
      });

      try {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            apikey: OMDB_API_KEY,
            s: title,
            type: type,
            y: year,
          }
        });

        const result = response.data;
        if (result.Response === 'True') {
          return result.Search;
        } else {
          throw new Error(result.Error);
        }
      } catch (error) {
        throw new Error('Error fetching data from OMDB API');
      }
    },
  },
};

module.exports = { typeDef, resolvers };
