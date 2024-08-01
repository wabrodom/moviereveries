import { gql } from '@apollo/client'
import { MOVIE_LIST_DETAILS } from './fragments'

export const ADD_MOVIE_LIST = gql`
  mutation ($listName: String!, $description: String!, $list: [ListItemInput]!) {
    addMovieList(listName: $listName, description: $description, list: $list) {
      ...MovieListDetails
    }
  }
  ${MOVIE_LIST_DETAILS}
`
export const CHANGE_FAVORITE_GENRE = gql`
  mutation Mutation($genre: String!) {
    changeFavoriteGenre(genre: $genre)
  }
`
export const SAVE_MOVIE_LIST = gql`
  mutation SaveMovieList($listId: String!) {
    saveMovieList(listId: $listId) {
      ...MovieListDetails
      
      createdAt
      updatedAt
    }
  }
  ${MOVIE_LIST_DETAILS} 
`

