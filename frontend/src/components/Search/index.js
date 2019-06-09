import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { search } from '../../redux/actions/search';
import Results from './Results';
import isEmpty from '../../utils/validation/is-empty';

class Search extends React.Component {

  render() {
    if (!isEmpty(this.props.searchResults.items)) {
      return (
        <div>
          <Results results={this.props.searchResults.items}/>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  searchResults: state.search,
});

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Search));

Search.propTypes = {
  products: PropTypes.object,
  search: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.object,
};
