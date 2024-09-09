import SingleMovieListBody from '../2-SingleMovieListBody'
import SingleMovieListHead from '../2-SingleMovieListHead'
import { FIND_MOVIE_LIST_BY_ID } from '../../../graphql/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import DownloadCsv from '../../Common/DownloadCsv'
import { Box } from '@mui/material'
import BackReturnIcon from '../../Common/BackReturnIcon'
import ShareButtons from '../../Common/ShareButtons/ShareButtons'

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
  p: 2,
}

const SingleMovieList = () => {
  const id = useParams().id
  const { loading, data, error } = useQuery(FIND_MOVIE_LIST_BY_ID, {
    variables: { findMovieListByIdId: id },
  })
  // console.log(JSON.stringify(error, null, 2))
  if (error) {
    return (
      <p>
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </p>
    )

  }
  if (loading) {
    return (
      <p>loading... </p>
    )
  }
  if (data.findMovieListById === null) {
    return (
      <p>The movie list is not found</p>
    )
  }
  const responseList = data.findMovieListById

  const titleImpressionArr = responseList.list.map((movie) =>  {
    return {
      Title: movie.primary_title,
      Impression: movie.impression
    }
  })

  const listToExport =  [
    { 'List name' : responseList.listName },
    { 'Description': responseList.description },
    ...titleImpressionArr
  ]
  //  the url -> /movielist/:id
  // the id  ->  responseList.id
  const shareUrl = window.location.href
  const listName = responseList.listName

  return (
    <div>
      <SingleMovieListHead list={responseList} />
      <BackReturnIcon />
      <SingleMovieListBody list={responseList} />
      <Box sx={buttonContainerStyle}>
        <ShareButtons shareUrl={shareUrl} title={listName} />
        <DownloadCsv
          data={listToExport}
          dataStartRow={2}
          fileName={responseList.listName}
        />
      </Box>
    </div>
  )
}

export default SingleMovieList