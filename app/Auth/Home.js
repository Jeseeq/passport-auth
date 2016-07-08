import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Home extends Component {

  render(){
    const {authenticatedUser, user} = this.props;
    return(
      <div className="jumbotron text-center">
    		<h1><span className="fa fa-lock"></span>Тестове завдання</h1>
        {
          !user ?
          <div>
            <p>Ввійдіть або зареєструйтесь</p>
            <Link to="/login" className="btn btn-default"><span className="fa fa-user"></span>Вхід</Link>
        		<Link to="/signup" className="btn btn-default"><span className="fa fa-user"></span>Реєстрація</Link>
        		<a href="/auth/twitter" className="btn btn-info"><span className="fa fa-twitter"></span> Twitter(Not working)</a>      		
          </div>
        :   <Link to="/dashboard" className="btn btn-default"><span className="fa fa-user"></span>Dashboard</Link>
        }
    	</div>
    )
  }
}
