import SingUpContainer from './SignUpContainer'
import { useMutation } from '@apollo/client'
import { SIGNUP, LOGIN } from '../../queries'
import useNotification from '../../contexts/NotificationContext/useNotification'
import { useState } from 'react'

const SignUp = ({ setToken }) => {
  const { notify } = useNotification()
  const [credentials, setCredentials] = useState(null)
  const [signup] = useMutation(SIGNUP, {
    onError: (error) => {
      // notify('error', error.graphQLErrors[0].message)
      notify('error', error.graphQLErrors[0].extensions.error.message)
    },
    onCompleted: async () =>  {
      await login({
        variables: {
          username: credentials.username,
          password: credentials.password
        }
      })
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
      // console.log(JSON.stringify(error, null, 2))
    }
  })

  const submit = async (values) => {
    const { username, password, name, favoriteGenre } = values
    await signup({
      variables: {
        username, password, name, favoriteGenre
      }
    })

  }


  return (
    <SingUpContainer handleSubmit={submit} setCredentials={setCredentials} />
  )
}

export default SignUp


// const errExample = {
//   'name': 'ApolloError',
//   'graphQLErrors': [
//     {
//       'message': 'Creating user failed',
//       'locations': [
//         {
//           'line': 2,
//           'column': 3
//         }
//       ],
//       'path': [
//         'createUser'
//       ],
//       'extensions': {
//         'code': 'BAD_USER_INPUT',
//         'invalidArgs': {
//           'username': 'jojo',
//           'name': 'jotaro',
//           'favoriteGenre': 'passs',
//           'password': '123456'
//         },
//         'error': {
//           'errors': {
//             'username': {
//               'name': 'ValidatorError',
//               'message': 'Error, expected `username` to be unique. Value: `jojo`',
//               'properties': {
//                 'message': 'Error, expected `username` to be unique. Value: `jojo`',
//                 'type': 'unique',
//                 'path': 'username',
//                 'value': 'jojo'
//               },
//               'kind': 'unique',
//               'path': 'username',
//               'value': 'jojo'
//             }
//           },
//           '_message': 'User validation failed',
//           'name': 'ValidationError',
//           'message': 'User validation failed: username: Error, expected `username` to be unique. Value: `jojo`'
//         }
//       }
//     }
//   ],
//   'protocolErrors': [],
//   'clientErrors': [],
//   'networkError': null,
//   'message': 'Creating user failed'
// }
