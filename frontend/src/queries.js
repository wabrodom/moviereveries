import { gql } from "@apollo/client"
import { MOVIE_DETAILS } from "./fragments"

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
    allDirectors {
      name
      born
      movies {
        title
      }
      movieCount
      id
    }
  }
`

export const ALL_MOVIES = gql`
  query allMovies($director: String, $genre: String) {
    allMovies(director: $director, genre: $genre) {
      ...MovieDetails
    }
  }
  ${MOVIE_DETAILS}
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
    findMovies(text: $text) {
      ...MovieDetails
    }
  }
  ${MOVIE_DETAILS}
`

export const FIND_DIRECTOR_MOVIES = gql`
  query FindMoviesByDirectorId($directorId: String) {
    findMoviesByDirectorId(directorId: $directorId) {
      ...MovieDetails
    }
  }
  ${MOVIE_DETAILS}
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
    allMovies(director: $director) {
      ...MovieDetails
    }
  }
  ${MOVIE_DETAILS}
`

export const  ADD_MOVIE = gql`
  ${MOVIE_DETAILS}
  mutation(
    $title: String!, 
    $director: String!, 
    $released: Int!, 
    $genres: [String!]!){
    addMovie(title: $title, director: $director, released: $released, genres: $genres) {
      ...MovieDetails
    }
  }
`

export const EDIT_DIRECTOR = gql`
  mutation editDirector($name: String!, $setBornTo: Int!){
    editDirector(name: $name, setBornTo: $setBornTo) {
      name
      born
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

export const MOVIE_ADDED = gql`
  subscription {
    bookAdded {
      ...MovieDetails
    }
  }
  ${MOVIE_DETAILS}
`