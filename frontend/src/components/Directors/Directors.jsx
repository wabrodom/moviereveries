import { useQuery } from '@apollo/client'
import { ALL_DIRECTORS } from '../../graphql/queries'
import { Link } from 'react-router-dom'

import EditAuthorBirth from './EditDirectorBirth'

const Directors = ({ setError, directorAndMovieCount }) => {
  const result = useQuery(ALL_DIRECTORS)


  if (result.loading) {
    return <div>loading...</div>
  }
  const directors = result.data.allDirectorsImdb

  return (
    <div>
      <h2>directors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>movies</th>
          </tr>
          {directors.map((a) => (
            <tr key={a.nameId}>
              <td>
                <Link to={`/directors/${a.id}`}>
                  {a.display_name}
                </Link>
              </td>
              <td>{a.born}</td>
              <td>{a.movieCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <EditAuthorBirth directors={directors} setError={setError}/>
    </div>
  )
}

export default Directors