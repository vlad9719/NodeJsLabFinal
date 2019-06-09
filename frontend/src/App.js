import React, { Component } from 'react';
import Register from 'components/Register';
import Login from 'components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { connect } from 'react-redux';
import { me } from 'redux/actions/user';
import PropTypes from 'prop-types';
import Search from 'components/Search';
import AuthorizedWithGoogle from 'components/AuthorizedWithGoogle';
import { Redirect } from 'react-router-dom';
import Feed from 'components/Feed';

import Home from 'components/Home';
import Layout from 'components/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'index.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isPermissions ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.props.me();
  }

  render() {
    const { isAuthenticated } = this.props.user;

    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/authorized-with-google/:jwt" component={AuthorizedWithGoogle} />
            <Route exact path="/search/:query" component={Search} />
            <PrivateRoute
              isPermissions={isAuthenticated}
              exact
              path="/feed"
              component={Feed}
            />
          </Layout>
        </Router>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = {
  me
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  me: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};
