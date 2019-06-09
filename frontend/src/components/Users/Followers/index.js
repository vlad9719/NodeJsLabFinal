import React from 'react';
import { getFollowers } from '../../../redux/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '../../common/Users/List';

class FollowersList extends React.Component {
  componentDidMount() {
    this.props.getFollowers(this.props.user.userInfo.id);
  }

  render() {
    return <List users={this.props.user.followers} heading="Followers"/>
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  getFollowers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FollowersList));

FollowersList.propTypes = {
  getUserFeed: PropTypes.func
};
