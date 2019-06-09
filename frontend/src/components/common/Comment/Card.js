import React from 'react';
import PropTypes from 'prop-types';

export default function Comment(props) {
  const comment = props.comment;

  return (
    <div className="border border-light mt-3 offset-1 col-sm-11">
      <div className="border bg-light border-left"><span
        className="ml-3 d-block"><b> @{comment.user.login}</b></span>
        <i className="ml-3">commented on {comment.createdAt}</i>
      </div>
      <div className="ml-3 pt-2 pb-5 border-dark font-italic font-weight-lighter">{comment.text}</div>
      <div className="border">
        {comment.mentioned.length ? (<div className="ml-3 font-weight-light d-block">Mentioned:
          {comment.mentioned.map(user => {
            return (
              <div className="font-weight-bold d-inline" key={user.id}> @{user.login}</div>
            );
          })}
        </div>) : ''}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comments: PropTypes.array,
};
