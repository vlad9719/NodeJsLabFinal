import React from 'react';
import PropTypes from 'prop-types';

export default function Message(props) {
  return (
    <div className="my-5 text-center col-sm-4 offset-sm-4 bg-light border">
      <h3>Hello {props.login} !</h3>
    </div>
  )
}

Message.propTypes = {
  login: PropTypes.object,
};
