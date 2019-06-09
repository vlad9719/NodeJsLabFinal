import React from 'react';
import Card from './Card';
import { me } from '../../../redux/actions/user';
import { getUserFeed } from '../../../redux/actions/feed';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Post extends React.Component {
  componentDidMount() {
    this.props.getUserFeed();
  }

  render(props) {
    return (
      <div>
        <Card post={this.props.post}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.feed,
  user: state.user,
});

const mapDispatchToProps = {
  me,
  getUserFeed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Post));

Post.propTypes = {
  getUserFeed: PropTypes.func,
};