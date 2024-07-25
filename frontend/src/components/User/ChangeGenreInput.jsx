
import { Formik } from 'formik'
import FormikInput from '../Common/FormikInput'
import * as yup from 'yup'
import { Box } from '@mui/material'

const style = { p: 1, m: 1 }

const ChangeGenreInput = ({ onSubmit }) => {

  const initialValues = {
    newGenre: '',
  }

  const validationSchema = yup.object().shape({
    newGenre: yup.string().min(3).required('genre is at least 3 letters'),
  })

  return (
    <Box sx={style}>
      <h3>
        Change your favorite genre:
      </h3>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <Form onSubmit={handleSubmit} /> }
      </Formik>

    </Box>
  )
}

const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <FormikInput name='newGenre' placeholder='newGenre' />
      <button type='submit'>change genre</button>
    </form>
  )
}

export default ChangeGenreInput