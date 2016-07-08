import {
  signup,
  signupSuccess,
  signupFailure,
  getCurrentUser,
  loginSuccess
} from './user'

import {reduxForm} from 'redux-form'
import SignupForm from './SignupForm'

const validate = (values) => {
  const errors = {}
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Введіть імя користувача'
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Введіть email'
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Введіть пароль'
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Введіть підтвердження паролю'
  }
  if (values.password && values.password.trim() !== '' &&
      values.confirmPassword && values.confirmPassword.trim() !== '' &&
      values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Паролі не співпадають'
  }
  return errors
}

function validateAndSignup (values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(signup(values))
    .then((response) => {
      let data = response.payload.data
      if (response.payload.status !== 200) {
        dispatch(signupFailure(response.payload))
        reject(data.errors)
      } else {
        resolve()
        dispatch(getCurrentUser()).then((response) => {
          if (!response.payload.data.message){
            dispatch(loginSuccess(response.payload))
          }
        })
      }
    })
  })
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: validateAndSignup
  }
}

export default reduxForm({
  form: 'SignupForm',
  fields: ['name', 'email', 'password', 'confirmPassword'],
  validate
},
  mapStateToProps,
  mapDispatchToProps
)(SignupForm)
