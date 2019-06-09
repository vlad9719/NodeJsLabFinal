import React from 'react';
import PropTypes from 'prop-types';
import Post from '../common/Post';
import AddPost from './AddPost';

export default function Table(props) {
  return (
    <div className="mt-5 offset-3 col-sm-6">
      <h1 className="text-center">My feed</h1>
      <AddPost/>
      {props.feed.feedPosts.map(post => {
        return <Post post={post} key={post.id}/>
      })}
    </div>
  );
}

Table.propTypes = {
  feed: PropTypes.object,
};
