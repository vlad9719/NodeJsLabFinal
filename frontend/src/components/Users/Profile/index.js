import React from 'react';
import { getViewedUser, getAllUsers, getFollowing, getFollowers, me, follow, unfollow } from '../../../redux/actions/user';
import { getViewedUserPosts } from '../../../redux/actions/post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from './Card';
import _ from 'lodash';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onFollowButtonClick = this.onFollowButtonClick.bind(this);
    this.onUnfollowButtonClick = this.onUnfollowButtonClick.bind(this);
  }
  componentDidMount() {
    const userId = this.props.match.params.id;
    this.props.me()
      .then(() => {
        this.props.getViewedUser(userId);
        this.props.getViewedUserPosts(userId);
        this.props.getAllUsers();
        this.props.getFollowers(this.props.user.userInfo.id);
        this.props.getFollowing(this.props.user.userInfo.id);
      });
  }

  onFollowButtonClick(event) {
    this.props.follow(this.props.user.userInfo.id, this.props.match.params.id)
      .then(() => {
        this.props.getFollowing(this.props.user.userInfo.id);
      });
    event.preventDefault();
  }

  onUnfollowButtonClick(event) {
    this.props.unfollow(this.props.user.userInfo.id, this.props.match.params.id)
      .then(() => {
        this.props.getFollowing(this.props.user.userInfo.id);
      });
    event.preventDefault();
  }

  render() {
    if (_.isEmpty(this.props.user.viewedUser) || !this.props.posts) {
      return null;
    }

    return <Card user={this.props.user.viewedUser} posts={this.props.posts.viewedUserPosts}
                 following={this.props.user.following}
                 onFollowButtonClick={this.onFollowButtonClick}
                 onUnfollowButtonClick={this.onUnfollowButtonClick}/>;
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
  getFollowers,
  getFollowing,
  me,
  follow,
  unfollow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Profile));

Profile.propTypes = {
  getUserFeed: PropTypes.func,
};
