import { gql } from "@apollo/client"

export const MOVIE_IMDB_DETAILS = gql`
  fragment MovieImdbDetails on MovieImdb {
    imdb_id
    original_title
    primary_title
    genres
    plot
    is_adult
    runtime_minutes
    start_year
    end_year
    type
    postersUse {
      url
    }
    directorsAddedUse {
      display_name
      movies
      moviesImdb
      nameId
    } 
    id
  }
`


export const MOVIE_LIST_DETAILS = gql`
  fragment MovieListDetails on MovieList {
    listName
    description
    list {
      movieId
      primary_title
      original_title
      imdb_id
      impression
    }
    id
    
  }
`

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

