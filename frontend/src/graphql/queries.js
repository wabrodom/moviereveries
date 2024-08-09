import { gql } from '@apollo/client'
import { MOVIE_IMDB_DETAILS } from './fragments'
import { MOVIE_LIST_DETAILS } from './fragments'

export const LOGIN = gql`
  mutation($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`

export const SIGNUP = gql`
  mutation CreateUser($username: String!, $name: String!, $favoriteGenre: String!, $password: String!) {
    createUser(username: $username, name: $name, favoriteGenre: $favoriteGenre, password: $password) {
      name
      passwordHash
      movies
      id
      favoriteGenre
      username
    }
  }
`

export const ALL_DIRECTORS = gql`
  query{
    allDirectorsImdb {
      nameId
      display_name
      born
      movies {
        primary_title
      }
      moviesImdb
      movieCount
      id
    }
  }
`

export const ALL_MOVIES = gql`
  query allMoviesImdb($director: String, $genre: String) {
    allMoviesImdb(director: $director, genre: $genre) {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres {
      genre
      id
    }
  }
`
export const ALL_MOVIES_LIST = gql`
  query allMovieLists {
    allMovieLists {
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
  }
`

export const FETCH_MOVIES = gql`
  query FetchMovies($year: String, $type: String, $title: String!) {
    fetchMovies(year: $year, type: $type, title: $title) {
      Title
      Year
      imdbID
      Type
      Poster
    }
  }
`

export const FIND_MOVIES = gql`
  query FindMovies($text: String) {
    findMoviesImdb(text: $text) {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const FIND_MOVIE_BY_IMDB = gql`
  query FindMoviesImdbByImdb($imdbId: String) {
    findMoviesImdbByImdb(imdb_id: $imdbId) {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const FIND_DIRECTOR_MOVIES = gql`
  query ($directorId: String) {
    findMoviesImdbByDirectorId(directorId: $directorId) {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const FIND_MOVIE_LIST_BY_ID = gql`
  query FindMovieListById($findMovieListByIdId: String!) {
    findMovieListById(id: $findMovieListByIdId) {
      ...MovieListDetails
      createdAt
      updatedAt
    }

  }
  ${MOVIE_LIST_DETAILS}  
`

export const NEW_MOVIE_DETAILS = gql`
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

      directors: credits(first: 10, categories: ["director"]) {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }

      writers: credits(first: 10, categories: ["writer"]) {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }

      directorsAdded {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }

      writersAdded {
        name {
          id
          display_name
          avatars {
            url
            width
            height
          }
        }
      }

    }
  }
`

export const ALL_DIRECTOR_MOVIES = gql`
  query($director: String) {
    allMoviesImdb(director: $director) {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const ADD_MOVIE = gql`
  ${MOVIE_IMDB_DETAILS}
  mutation (
    $imdbId: String!, 
    $originalTitle: String, 
    $primaryTitle: String, 
    $genres: [String], 
    $plot: String, 
    $isAdult: Boolean, 
    $runtimeMinutes: Int, 
    $startYear: Int, 
    $type: String, 
    $endYear: Int, 
    $postersUse: [PosterInput], 
    $directorsAddedUse: [DirectorsAddedUseInput]) {
  addMovieImdb(
    imdb_id: $imdbId, 
    original_title: $originalTitle, 
    primary_title: $primaryTitle, 
    genres: $genres, 
    plot: $plot, 
    is_adult: $isAdult, 
    runtime_minutes: $runtimeMinutes, 
    start_year: $startYear, 
    type: $type, 
    end_year: $endYear, 
    postersUse: $postersUse, 
    directorsAddedUse: $directorsAddedUse){
      ...MovieImdbDetails
    }
  }
`

export const EDIT_DIRECTOR = gql`
  mutation ($name: String!, $setBornTo: Int!){
    editDirectorImdb(name: $name, setBornTo: $setBornTo) {
      nameId
      display_name
      born
      id
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`
export const CURRENT_USER_FULL = gql`
  query MeFull {
    meFull {
      username
      id
      favoriteGenre
      name

      movieLists {
        ...MovieListDetails
      }
        
    }
  }
  ${MOVIE_LIST_DETAILS}
`



export const MOVIE_ADDED = gql`
  subscription {
    movieImdbAdded {
      ...MovieImdbDetails
    }
  }
  ${MOVIE_IMDB_DETAILS}
`

export const USER_SAVED_MOVIE_LIST = gql`
  query UserSavedMovieList {
    userSavedMovieList {
      ...MovieListDetails
      createdAt
      updatedAt
    }

  }
  ${MOVIE_LIST_DETAILS} 
`

export const USER_CREATED_MOVIE_LIST = gql`
  query UserCreatedMovieList {
    userCreatedMovieList {
      ...MovieListDetails
      createdAt
      updatedAt
      deletedByUser
      
      savedUser
    }
  }
  ${MOVIE_LIST_DETAILS} 
`

export const VALIDATE_TOKEN = gql`
  query ValidateToken($token: String!) {
  validateToken(token: $token) {
    username
    name
    favoriteGenre
    movieLists
    id
  }
}
`

