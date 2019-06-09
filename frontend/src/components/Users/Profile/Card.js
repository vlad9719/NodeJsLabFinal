import React from 'react';
import Post from '../../common/Post';

export default function Card(props) {
  const { user } = props;
  const posts = props.posts;
  return (
    <div className="offset-3 col-6">
      <h1 className="text-center mt-3">Tweets by {user.login}</h1>
      {posts.map(post => {
        return <Post post={post} key={post.id}/>
      })}
    </div>
  );
}
