import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setToken } from '../../utils/request';
import { me } from '../../redux/actions/user';

class AuthorizedWithGoogle extends React.Component {

  constructor(props) {
    super(props);
    setToken(this.props.match.params.jwt);
    this.props.me();
  }

  render() {
    return <Message login={this.props.user.userInfo.login}/>;
  }

}


const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  me,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthorizedWithGoogle));

AuthorizedWithGoogle.propTypes = {
  match: PropTypes.object,
};
