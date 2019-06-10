import React from 'react';
import Form from './Form';
import { addComment } from '../../../../redux/actions/comment';
import { getUserFeed } from '../../../../redux/actions/feed';
import { getAllUsers } from '../../../../redux/actions/user';
import { getViewedUserPosts } from '../../../../redux/actions/post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class AddComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mentionedUsers: [],
      selectedUser: {},
      selectedUserId: '',
      commentData: {
        text: '',
        mentionedIds: [],
      },
      file: {},
    };
    this.onMentionButtonClick = this.onMentionButtonClick.bind(this);
    this.onMentionedUserSelect = this.onMentionedUserSelect.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setDefaultMentionedUser();
  }

  setDefaultMentionedUser() {
    const firstUser = this.props.user.allUsers[0];
    this.setState({
      ...this.state,
      selectedUser: firstUser.login,
      selectedUserId: firstUser.id,
    });
  }

  onMentionedUserSelect(event) {
    this.setState({
      ...this.state,
      selectedUser: event.target.value,
      selectedUserId: event.currentTarget.selectedOptions[0].attributes['data-id'].value,
    });
  }

  onTextChange(event) {
    this.setState({
      ...this.state,
      commentData: {
        ...this.state.commentData,
        text: event.target.value,
      },
    });
  }

  onPhotoChange(event) {
    const photo = event.target.files[0];
    this.setState({
      ...this.setState,
      file: photo,
    });
  }

  onMentionButtonClick(event) {
    const firstUser = this.props.user.allUsers[0];
    this.setState({
      ...this.state,
      mentionedUsers: [...this.state.mentionedUsers, this.state.selectedUser],
      selectedUser: firstUser.login,
      selectedUserId: firstUser.id,
      commentData: {
        ...this.state.commentData,
        mentionedIds: [...this.state.commentData.mentionedIds, this.state.selectedUserId],
      },
    });

    event.preventDefault();
  }

  onSubmit(event) {
    const photoFormData = new FormData();
    photoFormData.append('file', this.state.file);

    this.props.addComment(this.state.commentData, photoFormData, this.props.user.userInfo.id, this.props.postId)
      .then(() => {
        this.props.getUserFeed(this.props.user.userInfo.id)
          .then(() => {
            if (this.props.user.viewedUser.id) {
              this.props.getViewedUserPosts(this.props.user.viewedUser.id);
            }
          });
      });
    this.setState({
      mentionedUsers: [],
      selectedUser: {},
      selectedUserId: '',
      currentHashtag: '',
      commentData: {
        text: '',
        hashtags: [],
        mentionedIds: [],
      },
      file: {},
    });
    event.preventDefault();
  }

  render() {
    return <Form
      users={this.props.user.allUsers}
      onMentionButtonClick={this.onMentionButtonClick}
      onMentionedUserSelect={this.onMentionedUserSelect}
      mentionedUsers={this.state.mentionedUsers}
      selectedUser={this.state.selectedUser}
      currentHashtag={this.state.currentHashtag}
      text={this.state.commentData.text}
      onTextChange={this.onTextChange}
      onPhotoChange={this.onPhotoChange}
      onSubmit={this.onSubmit}/>;
  }
}

const mapStateToProps = state => ({
  feed: state.feed,
  user: state.user,
  posts: state.posts,
});

const mapDispatchToProps = {
  addComment,
  getUserFeed,
  getAllUsers,
  getViewedUserPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddComment));

AddComment.propTypes = {
  addComment: PropTypes.func,
};
