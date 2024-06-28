
import { Formik } from 'formik';
import FormikInput from '../FormikInput';
import * as yup from 'yup';

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
  });

  return (
    <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => <SearchMoviesForm onSubmit={handleSubmit} /> }
        </Formik>

    </div>
  )
}

const SearchMoviesForm = ({onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormikInput name='title' placeholder='title' />
      <FormikInput name='type' placeholder='type' />
      <FormikInput name='year' placeholder='year' />
      <button type='submit'>search for movies</button>
    </form>
  )
}

export default SearchMoviesContainer