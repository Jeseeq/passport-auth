import {connect} from 'react-redux';

import Home from './Home';

const mapStateToProps = (state) =>{
  return{
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user.user
  };
};

const HomeContainer = connect(
  mapStateToProps
)(Home);
export default HomeContainer;
