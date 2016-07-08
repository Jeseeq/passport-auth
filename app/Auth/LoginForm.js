import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
// import '../../Form.scss'
export default class LoginForm extends Component {

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.status === 'authenticated' &&
        !nextProps.user.error && !nextProps.user.loading) {
     // lets show redirect if exist
      try {
        const redirect = this.props.location.query.redirect
        this.context.router.replace(redirect)
      } catch (err) {
        this.context.router.replace('/')
      }
    }
  }
  render () {
    const {
      fields: { email, password },
      handleSubmit,
      submitting,
      error
    } = this.props
    return (

      <div className='col-xs-offset-2 col-xs-8 col-md-offset-3 col-md-6 form-container'>
        <i className='fa fa-user'></i>
        <header>Вхід</header>
        <form className='form-horizontal' onSubmit={handleSubmit(this.props.signIn.bind(this))}>
          <div className={`form-group ${email.touched && email.error ? 'has-error' : ''}`}>
            <label htmlFor='email' className='control-label col-sm-4'>email</label>
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
                className='form-control col-sm-8'
                {...password} />
            </div>
            <div className='col-sm-8 col-sm-offset-4  text-danger'>
              {password.touched ? password.error : ''}
            </div>
          </div>
          {error && <div>{error}</div>}
          <div className='form-group text-center'>
            <button type='submit' className='btn btn-primary submit'>
              <i className={submitting ? 'fa fa-spinner fa-spin' : 'fa fa-paper-plane'} /> Ввійти
            </button>
            <Link to='/' className='btn btn-default'>Назад</Link>
          </div>
        </form>
        <p className='text-center'>Ще не маєте аккаунта</p>
        <p className='text-center'><Link to={'/signup'}>Зареєструйтесь </Link>зараз</p>
      </div>
    )
  }
}
LoginForm.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  location: PropTypes.object,
  submitting: PropTypes.bool
}
