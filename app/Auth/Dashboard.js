
import React, {Component} from 'react'
import {Link} from 'react-router'
export default class Dashboard extends Component {

  handleLogout(e) {
    e.preventDefault()
    this.props.logout()
  }
  render(){
    const {user} = this.props
    return(

      <div className="container">
      	<div className="page-header text-center">
      		<h1><span className="fa fa-anchor"></span>Dashboard</h1>
      		<a  onClick={this.handleLogout.bind(this)} className="btn btn-default btn-sm">Logout</a>
      	</div>
      	<div className="row">
      		<div className="col-sm-6">
      			<div className="well">
      				<h3><span className="fa fa-user"></span> Local</h3>
                <p> { user ? user.sub : ''} </p>
                <p> { user ? user.name : ''} </p>
                <p> {user ? user.email : ''} </p>
      			</div>
      		</div>
      		<div className="col-sm-6">
      			<div className="well">
      				<h3 className="text-info"><span className="fa fa-twitter"></span> Twitter</h3>
      					<a href="/connect/twitter" className="btn btn-info">Connect Twitter</a>
      			</div>
      		</div>
      	</div>
      </div>
    )
  }
}
