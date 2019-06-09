import React from 'react';
import Post from '../common/Post';
import Comment from '../common/Comment';

export default function Results(props) {
  const results = props.results;
  return (
    <div className="offset-3 col-6">
      <h1 className="text-center">Search Results By Posts</h1>
      {results.searchResultsByPosts && results.searchResultsByPosts.length ? results.searchResultsByPosts.map(post => {
        return <Post post={post}/>;
      }) : <div className="font-large text-center">No results in posts</div>}
      <h1 className="text-center">Search Results By Comments</h1>
      {results.searchResultsByComments && results.searchResultsByComments.length ? results.searchResultsByComments.map(comment => {
        return <Comment comment={comment}/>;
      }) : <div className="font-large text-center">No results in comments</div>}
      <h1 className="text-center">Hashtags:</h1>
      {results.searchResultsByHashtags && results.searchResultsByHashtags.hashtags.length ? results.searchResultsByHashtags.hashtags.map(
        hashtag => {
          return (
            <div className="d-inline font-italic font-large" key={hashtag.id}> #{hashtag.text}</div>
          );
        }) : <div className="font-large text-center">No results in hashtags</div>}
      {results.searchResultsByHashtags && results.searchResultsByHashtags.postsWithHashtags ? results.searchResultsByHashtags.postsWithHashtags.map(
        post => {
          return <Post post={post}/>;
        }
      ): ''};
    </div>
  );
};
