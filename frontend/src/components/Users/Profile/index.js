import React from 'react';
import { getViewedUser, getAllUsers } from '../../../redux/actions/user';
import { getViewedUserPosts } from '../../../redux/actions/post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './Card';
import _ from 'lodash';

class Profile extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.getViewedUser(userId);
    this.props.getViewedUserPosts(userId);
    this.props.getAllUsers();
  }

  render() {
    if (_.isEmpty(this.props.user.viewedUser) || !this.props.posts) {
      return null;
    }

    return <Card user={this.props.user.viewedUser} posts={this.props.posts.viewedUserPosts}/>
  }
}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
});

const mapDispatchToProps = {
  getViewedUser,
  getViewedUserPosts,
  getAllUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));

Profile.propTypes = {
  getUserFeed: PropTypes.func
};
