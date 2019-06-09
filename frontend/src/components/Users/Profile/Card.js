import React from 'react';
import Post from '../../common/Post';

export default function Card(props) {
  const { user } = props;
  const posts = props.posts;
  const following = props.following;
  console.log('following = ' + following);
  const isFollowing = following.some(followedUser => {
    return user.id === followedUser.id;
  });
  return (
    <div className="offset-3 col-6">
      <h1 className="mt-3 text-center">Tweets by {user.login}</h1>
      {isFollowing ? (
        <button className="offset-5 col-2 btn btn-warning" onClick={(event) => props.onUnfollowButtonClick(event)}>
          Unfollow
        </button>
      ) : (
        <button className="offset-5 col-2 btn btn-primary" onClick={(event) => props.onFollowButtonClick(event)}>
          Follow
        </button>
      )}
      {posts.map(post => {
        return <Post post={post} key={post.id}/>;
      })}
    </div>
  );
}
