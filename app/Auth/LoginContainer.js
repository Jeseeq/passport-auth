import {
  login,
  loginSuccess,
  loginFailure,
  getCurrentUser
} from './user'

import {reduxForm} from 'redux-form'
import LoginForm from './LoginForm'

// Client-side validation
const validate = values => {
  const errors = {}

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Введіть email'
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Введіть пароль'
  }
  return errors
}

const validateAndSignInUser = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(login(values))
    .then((response) => {
      let data = response.payload.data
      if (response.payload.status !== 200) {
        dispatch(loginFailure(data))
        // for redux-form
        reject({_error: data.message})
      } else {
         dispatch(getCurrentUser()).then((response) => {
              if (!response.payload.data.message){
                dispatch(loginSuccess(response.payload))
              }
            })
        // for redux-form
        resolve()
      }
    })
  })
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
    signIn: validateAndSignInUser
  }
}

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
},
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
