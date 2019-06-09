import React from 'react';
import Card from './Card';
import { me } from '../../../redux/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Post extends React.Component {
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Post));

Post.propTypes = {
  getUserFeed: PropTypes.func,
};
