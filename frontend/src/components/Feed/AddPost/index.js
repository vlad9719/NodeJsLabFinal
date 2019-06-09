import React from 'react';
import Card from './Card';
import { getAllUsers } from '../../../redux/actions/user';
import { addPost } from '../../../redux/actions/post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentionedUsers: [],
      selectedUser: {},
      selectedUserId: '',
      currentHashtag: '',
      postData: {
        text: '',
        hashtags: [],
        mentionedIds: [],
      },
      file: {},
    };
    this.onMentionButtonClick = this.onMentionButtonClick.bind(this);
    this.onMentionedUserSelect = this.onMentionedUserSelect.bind(this);
    this.onHashtagInputChange = this.onHashtagInputChange.bind(this);
    this.onAddHashtagButtonClick = this.onAddHashtagButtonClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getAllUsers()
      .then(() => {
        const firstUser = this.props.user.allUsers[0];
        this.setState({
          ...this.state,
          selectedUser: firstUser.login,
          selectedUserId: firstUser.id,
        });
      });
  }

  onMentionedUserSelect(event) {
    this.setState({
      ...this.state,
      selectedUser: event.target.value,
      selectedUserId: event.currentTarget.selectedOptions[0].attributes['data-id'].value,
    });
  }

  onHashtagInputChange(event) {
    this.setState({
      ...this.state,
      currentHashtag: event.target.value,
    });
  }

  onAddHashtagButtonClick(event) {
    this.setState({
      ...this.state,
      postData: {
        ...this.state.postData,
        hashtags: [...this.state.postData.hashtags, this.state.currentHashtag],
      },
      currentHashtag: '',
    });
    event.preventDefault();
  }

  onTextChange(event) {
    this.setState({
      ...this.state,
      postData: {
        ...this.state.postData,
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
      postData: {
        ...this.state.postData,
        mentionedIds: [...this.state.postData.mentionedIds, this.state.selectedUserId],
      },
    });

    event.preventDefault();
  }

  onSubmit(event) {
    const photoFormData = new FormData();
    photoFormData.append('file', this.state.file);

    this.props.addPost(this.state.postData, photoFormData, this.props.user.userInfo.id);
    this.setState({
      mentionedUsers: [],
      selectedUser: {},
      selectedUserId: '',
      currentHashtag: '',
      postData: {
        text: '',
        hashtags: [],
        mentionedIds: [],
      },
      file: {},
    });
    event.preventDefault();
  }

  render() {
    return <Card
      users={this.props.user.allUsers}
      onMentionButtonClick={this.onMentionButtonClick}
      onMentionedUserSelect={this.onMentionedUserSelect}
      mentionedUsers={this.state.mentionedUsers}
      selectedUser={this.state.selectedUser}
      hashtags={this.state.postData.hashtags}
      onHashtagInputChange={this.onHashtagInputChange}
      onAddHashtagButtonClick={this.onAddHashtagButtonClick}
      currentHashtag={this.state.currentHashtag}
      text={this.state.postData.text}
      onTextChange={this.onTextChange}
      onPhotoChange={this.onPhotoChange}
      onSubmit={this.onSubmit}
    />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  feed: state.feed,
});

const mapDispatchToProps = {
  getAllUsers,
  addPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddPost));

AddPost.propTypes = {
  getAllUsers: PropTypes.func,
};
