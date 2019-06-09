import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user';
import { withRouter } from 'react-router-dom';
import logo from '../assets/logo.png';
import { search } from '../redux/actions/search';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const searchString = event.target.value;
    this.setState({
      searchString
    });
  }

  onLogout = () => this.props.logoutUser(this.props.history);
  onSearch = event => {
    this.props.search(this.props.history, this.state.searchString);
    event.preventDefault();
  };

  render() {
    let { isAuthenticated, userInfo } = this.props.user;
    let authLinks = (
      <ul className="navbar-nav ml-lg-5">
        <li className="nav-item dropdown cursor-pointer">
          <div
            className="nav-link dropdown-toggle active"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            @{userInfo.login}
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/feed">
              Feed
            </Link>
            <Link to="/orders" className="dropdown-item">
              N following
            </Link>
            <Link to="/orders" className="dropdown-item">
              N followers
            </Link>
          </div>
        </li>
        <Link to="/users-list" className="nav-link active">All Users</Link>
        <Link to="/" className="nav-link active" onClick={this.onLogout}>
          Logout
        </Link>
      </ul>
    );

    let guestLinks = (
      <ul className="navbar-nav mr-lg-4">
        <li className="nav-item">
          <Link className="nav-link active" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">
            Log In
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Twittar" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          {isAuthenticated ? authLinks : guestLinks}
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={this.handleChange}
            />
            <button
              className="btn btn-outline-secondary my-2 my-sm-0"
              type="submit"
              onClick={this.onSearch}>
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = {
  logoutUser,
  search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  search: PropTypes.func,
  cart: PropTypes.object
};
