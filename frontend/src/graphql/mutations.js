import { gql } from "@apollo/client"
import { MOVIE_LIST_DETAILS } from "./fragments"

export const ADD_MOVIE_LIST = gql`
  mutation ($listName: String!, $description: String!, $list: [ListItemInput]!) {
    addMovieList(listName: $listName, description: $description, list: $list) {
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



