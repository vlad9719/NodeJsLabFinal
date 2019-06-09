import React from 'react';
import { getFollowing } from '../../../redux/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '../../common/Users/List';

class FollowingList extends React.Component {
  componentDidMount() {
    this.props.getFollowing(this.props.user.userInfo.id);
  }

  render() {
    return <List users={this.props.user.following} heading="Following"/>
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  getFollowing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FollowingList));

FollowingList.propTypes = {
  getUserFeed: PropTypes.func
};
