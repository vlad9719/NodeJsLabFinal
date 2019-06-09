import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../utils/validation/is-empty';
import { Link } from 'react-router-dom';

export default function Form(props) {
  return (
    <form
      className="mt-5 mb-5 offset-sm-2 offset-md-3 offset-lg-4 col-sm-8 col-md-6 col-lg-4 border"
      onChange={props.handleChange}
      onSubmit={props.handleSubmit}>
      <h3 className="text-center mt-3 mb-3">Sign In</h3>
      <div className="form-group">
        <label htmlFor="email">Your login:</label>
        <input
          type="text"
          className="form-control"
          id="login"
          placeholder="Login"
          title="Enter your login"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Your password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          title="Enter password"
        />
      </div>
      {!isEmpty(props.errors) && (
        <div className="w-100 h-auto p-2 mb-3 bg-white text-danger text-center font-weight-bold border border-danger">
          Wrong Login or Password
        </div>
      )}
      <button
        type="submit"
        className="btn btn-outline-primary col-sm-12 mb-3"
        onClick={props.handleSubmit}>
        Sign In
      </button>
      <div className="mb-3 text-center">
        <Link to="/register">Registration</Link>
      </div>
      <div className="mb-3 text-center">
        <a href={"http://localhost:8000/api/auth/google"} className="mr-auto">Authorize with Google</a>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  errors: PropTypes.object
};
