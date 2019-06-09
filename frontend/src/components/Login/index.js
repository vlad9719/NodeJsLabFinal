import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import { unsetErrors } from '../../redux/actions/error';
import PropTypes from 'prop-types';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        email: '',
        password: ''
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.props.unsetErrors();
  }

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      userData: {
        ...this.state.userData,
        [id]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.unsetErrors();
    this.props.login(this.props.history, this.state.userData);
  }

  render() {
    return (
      <Form
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        errors={this.props.errors.login}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

const mapDispatchToProps = {
  login,
  unsetErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));

Register.propTypes = {
  login: PropTypes.func,
  unsetErrors: PropTypes.func,
  history: PropTypes.object,
  errors: PropTypes.object
};
