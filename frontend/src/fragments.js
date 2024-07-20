import { gql } from '@apollo/client'

export const MOVIE_DETAILS = gql`
  fragment MovieDetails on Movie {
    title
    director {
      name
      born
    }
    released
    genres
    id
  }
`

