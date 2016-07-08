import {connect} from 'react-redux'
import { browserHistory } from 'react-router'
import Dashboard from './Dashboard'
import {logout} from './user'

const mapStateToProps = (state) =>{
  return{
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user.user
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
      logout: () => {
        dispatch(logout()).then((response) => {
          if (!response.error) {
            browserHistory.push('/');
          }
        })
      }
    }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
export default DashboardContainer
