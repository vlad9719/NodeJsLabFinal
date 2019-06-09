import React from 'react';
import { getUserFeed } from '../../redux/actions/feed';
import { me } from '../../redux/actions/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from './Table';

class Feed extends React.Component {
  componentDidMount() {
    this.props.me()
      .then(() => {
        this.props.getUserFeed(this.props.user.userInfo.id);
      });
  }

  render() {
    return (<div>
      <Table feed={this.props.feed}/>
    </div>);
  }
}

const mapStateToProps = state => ({
  feed: state.feed,
  user: state.user,
});

const mapDispatchToProps = {
  me,
  getUserFeed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Feed));

Feed.propTypes = {
  getUserFeed: PropTypes.func
};
