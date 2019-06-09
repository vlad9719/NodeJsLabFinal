import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../redux/actions/search';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    return (
    <div>Search component</div>
      );
    }
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user
});

const mapDispatchToProps = {
  search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Search));

Search.propTypes = {
  products: PropTypes.object,
  search: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object
};
