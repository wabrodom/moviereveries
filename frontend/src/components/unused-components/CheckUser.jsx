import { useQuery } from '@apollo/client'
import { CURRENT_USER } from './graphql/queries'
import AllRoutes from './AllRoutes'

const CheckUser = () => {
  const { loading, data, error } = useQuery(CURRENT_USER)

  if (loading) {
    return (
      <p>
        loading details...
      </p>
    )
  }

  if (error) {
    return (
      <div>
        <p>
          {error.message}
        </p>
        <p>
          NetworkError: failed to connect to db
        </p>
      </div>
    )
  }

  return (
    <AllRoutes user={data.me} />
  )
}

export default CheckUser