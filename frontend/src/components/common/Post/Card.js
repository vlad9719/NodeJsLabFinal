import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment';

export default function Card(props) {
  const { post } = props;
  return (
    <div className="border border-primary mt-5 mb-5">
      <div>
        <div className="border-secondary bg-light"><span
          className="ml-3 d-block">Author: <b> @{post.user.login}</b></span>
          <i className="ml-3">posted on {post.createdAt}</i>
        </div>
        <div className="ml-3 pt-2 pb-5 font-italic font-weight-lighter">{post.text}</div>
        <div className="border">
          {props.post.mentioned.length ? (<div className="ml-3 font-weight-light d-block">Mentioned:
            {props.post.mentioned.map(user => {
              return (
                <div className="font-weight-bold d-inline" key={user.id}> @{user.login}</div>
              );
            })}
          </div>) : ''}

          {props.post.hashtags.length ? (<div className="ml-3 font-weight-light d-block">Hashtags:
            {props.post.hashtags.map(hashtag => {
              return (
                <div className="d-inline font-italic" key={hashtag.id}> #{hashtag.text}</div>
              );
            })}
          </div>) : ''}
        </div>
        <div className="pt-1 pb-1">
          <button
            className="btn btn-primary col-sm-2 ml-3"
            data-toggle="collapse"
            data-target={`#comments${post.id}`}
            aria-expanded="false"
            aria-controls={`comments${post.id}`}>
            Comments
          </button>
        </div>
      </div>
      <div className="collapse border-secondary" id={`comments${post.id}`}>
        {post.comments.length ? post.comments.map(comment => {
          return <Comment comment={comment} key={comment.id}/>
        }) : <span className="font-weight-lighter ml-3">No comments for this post yet. Be the first to comment it!</span> }
      </div>
    </div>
);
}

Card.propTypes = {
  post: PropTypes.object,
};
