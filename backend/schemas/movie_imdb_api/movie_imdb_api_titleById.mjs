import { GraphQLError } from 'graphql'
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://graph.imdbapi.dev/v1'

/*
 query ($titleId: ID!) {
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

const client = new GraphQLClient(endpoint)

const titleById = async (id) => {

    const query = gql`
      query ($titleId: ID!) {
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
    `

    const variables = { titleId: id }

    try {
      const response = await client.request(query, variables);
      return response.title
    } catch (error) {
      console.error("Error fetching data from external GraphQL API:", error)

      throw new GraphQLError('Error fetching data from external GraphQL API:', {
        extensions: {
          code: 'ERROR_FETCHING_DATA',
          inValidArgs: args,
          error
        }
      })
    }
}

export { titleById }