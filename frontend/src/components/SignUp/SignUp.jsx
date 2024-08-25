import SingUpContainer from './SignUpContainer'
import { useMutation } from '@apollo/client'
import { SIGNUP, LOGIN } from '../../queries'
import useNotification from '../../contexts/NotificationContext/useNotification'

const SignUp = ({ setToken }) => {
  const { notify } = useNotification()
  const [signup] = useMutation(SIGNUP, {
    onError: (error) => {
      notify('error', error.graphQLErrors[0].message)
    }
  })
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('moviereveries-user-token', token)
    },
    onError: (error) => {
      notify('error', error.graphQLErrors[0].message)
    }
  })

  const submit = async (values) => {
    const { username, password, name, favoriteGenre } = values
    await signup({
      variables: {
        username, password, name, favoriteGenre
      }
    })
    await login({ variables: { username, password } })
  }

  // useEffect(() => {
  //   if (result.data) {
  //     const token = result.data.login.value
  //     setToken(token)
  //     localStorage.setItem('moviereveries-user-token', token)
  //   }
  // }, [result.data])

  return (
    <SingUpContainer handleSubmit={submit} />
  )
}

export default SignUp