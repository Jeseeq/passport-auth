import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
// import '../../Form.scss'

export default class SignupForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.user && nextProps.user.status === 'authenticated' &&
     !nextProps.user.error &&
     !nextProps.user.loading) {
      this.context.router.push('dashboard')
    }
  }
  render () {
    const {
      fields: {name, email, password, confirmPassword },
      handleSubmit,
      submitting,
      signup,
      error
    } = this.props
    return (
      <div className='col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 form-container'>
        <i className='fa fa-user'></i>
        <header>Реєстрація</header>
        <form className='form-horizontal' onSubmit={handleSubmit(signup)}>
          <div className={`form-group ${name.touched && name.error ? 'has-error' : ''}`}>
            <label htmlFor='name' className='control-label col-sm-4'>Імя користувача</label>
            <div className='col-sm-8'>
              <input
                id='name'
                placeholder='@name'
                type='text'
                className='form-control'
                {...name} />
            </div>
            <div className='col-sm-8 col-sm-offset-4  text-danger'>
              {name.touched ? name.error : ''}
            </div>
          </div>
          <div className={`form-group ${email.touched && email.error ? 'has-error' : ''}`}>
            <label htmlFor='email' className='control-label col-sm-4'>Email</label>
            <div className='col-sm-8'>
              <input
                id='email'
                placeholder='@email'
                type='text'
                className='form-control'
                {...email} />
            </div>
            <div className='col-sm-8 col-sm-offset-4  text-danger'>
              {email.touched ? email.error : ''}
            </div>
          </div>
          <div className={`form-group ${password.touched && password.error ? 'has-error' : ''}`}>
            <label htmlFor='password' className='control-label col-sm-4'>Пароль*</label>
            <div className='col-sm-8'>
              <input
                id='password'
                type='password'
                className='form-control'
                {...password} />
            </div>
            <div className='col-sm-8 col-sm-offset-4  text-danger'>
              {password.touched ? password.error : ''}
            </div>
          </div>
          <div className={`form-group ${confirmPassword.touched && confirmPassword.error ? 'has-error' : ''}`}>
            <label htmlFor='password' className='control-label col-sm-4'>Підтвердіть пароль*</label>
            <div className='col-sm-8'>
              <input
                id='password'
                type='password'
                className='form-control'
                {...confirmPassword} />
            </div>
            <div className='col-sm-8 col-sm-offset-4  text-danger'>
              {confirmPassword.touched ? confirmPassword.error : ''}
            </div>
          </div>

          {error && <div>{error}</div>}
          <div className='form-group text-center'>
            <button type='submit' className='btn btn-primary submit'>
              <i className={submitting ? 'fa fa-spinner fa-spin' : 'fa fa-paper-plane'} />Зареєструватись</button>
            <Link to='/' className='btn btn-default'>Назад</Link>
          </div>
        </form>
        <p className='text-center'>Зареєстровані?</p>
        <p className='text-center'><Link to={'/login'}>Ввійти</Link> зараз</p>
      </div>
    )
  }
}

SignupForm.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  resetMe: PropTypes.func,
  submitting: PropTypes.bool
}
