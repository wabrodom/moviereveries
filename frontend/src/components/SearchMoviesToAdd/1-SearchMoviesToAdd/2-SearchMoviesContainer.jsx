
import { Formik } from 'formik'
import FormikInput from '../../Common/FormikInput'
import * as yup from 'yup'
import { Box } from '@mui/material'

const searchMovieStyle = {
  p: 1, m: 1
}

const SearchMoviesContainer =  ( { onSubmit, oldSearchQuery }) => {

  const initialValues = {
    title: oldSearchQuery.title || '',
    type: oldSearchQuery.type ||'',
    year: oldSearchQuery.year ||'',
  }

  const validationSchema = yup.object().shape({
    title: yup.string().min(4).required('movie title is required'),
    type: yup.string(),
    year: yup.string(),
  })

  return (
    <Box sx={searchMovieStyle}>
      <h3>
        Search movie from omdbapi.com & imdbapi.dev
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SearchMoviesForm onSubmit={handleSubmit} /> }
      </Formik>

    </Box>
  )
}

const SearchMoviesForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormikInput
        name='title'
        placeholder='title'
        data-testid='search-outer-api-title'
      />
      <FormikInput name='type'
        placeholder='type'
        data-testid='search-outer-api-type'
      />
      <FormikInput name='year'
        placeholder='year'
        data-testid='search-outer-api-year'
      />
      <button type='submit'
        data-testid='search-outer-api-submit'
      >
        search for movies
      </button>
    </form>
  )
}

export default SearchMoviesContainer