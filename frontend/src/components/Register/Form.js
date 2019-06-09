import React from 'react';
import PropTypes from 'prop-types';

export default function Form(props) {
  return (
    <form
      className="mt-5 mb-5 offset-sm-2 offset-md-3 offset-lg-4 col-sm-8 col-md-6 col-lg-4 border"
      onChange={props.handleChange}>
      <h3 className="text-center mt-3 mb-3">Registration</h3>
      <div className="form-group">
        <label htmlFor="name">Login</label>
        <input
          type="text"
          className="form-control"
          id="login"
          placeholder="Login"
          title="Give yourself a fancy login!"
          aria-describedby="nameHelp"
          required
        />
        {props.errors.login && (
          <span className="text-danger">{props.errors.login}</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          title="Please provide a valid email"
          aria-describedby="emailHelp"
        />
        {props.errors.email && (
          <span className="text-danger">{props.errors.email}</span>
        )}
        <span id="emailHelp" className="form-text text-muted">
          Provide a valid email
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          aria-describedby="passwordHelp"
          title="Think of some difficult password"
        />
        {props.errors.password && (
          <span className="text-danger">{props.errors.password}</span>
        )}
        <span id="passwordHelp" className="form-text text-muted">
          Think of some hard-to-guess password!
        </span>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary col-sm-12 mb-3"
        onClick={props.handleSubmit}>
        Submit
      </button>
      <div className="mb-3 text-center">
        <a href={"http://localhost:8000/api/auth/google"} className="mr-auto">Authorize with Google</a>
      </div>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  errors: PropTypes.object
};
