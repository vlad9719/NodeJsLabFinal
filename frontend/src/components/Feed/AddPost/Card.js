import React from 'react';

export default function Card(props) {
  const { users, mentionedUsers, selectedUser, hashtags, currentHashtag } = props;
  return (
    <div>
      <form className="border border-primary border-solid" encType="multipart/form-data" onSubmit={(event) => props.onSubmit(event)}>
        <textarea className="form-control col-12" id="text" placeholder="Add your post..." onChange={props.onTextChange} value={props.text} required/>
        <div className="form-group p-1">
          <label htmlFor="mentionedIds">Mention somebody:</label>
          {users && users.length ? (<select id="mentionedIds" className="ml-3" onChange={props.onMentionedUserSelect}>
            {users.map(user => {
              return (
                <option key={user.id} data-id={user.id} selected={user.login === selectedUser}>{user.login}</option>
              );
            })}
          </select>) : ''}
          <button className="btn btn-secondary col-2 ml-3"
                  onClick={(event) => props.onMentionButtonClick(event)}>Mention user
          </button>
          <div className="d-block"> You've mentioned {mentionedUsers.length} user(s)</div>
          <div className="d-block"> {mentionedUsers.length ? mentionedUsers.map(user => {
            return (
              <div className="border border-secondary bg-light d-inline m-2" key={user}> @{user} </div>
            );
          }) : ''}
          </div>
        </div>
        <div className="form-group p-1">
          <input type="text" className="form-control col-3 d-inline" placeholder="Your Hashtag"
                 onChange={props.onHashtagInputChange} value={currentHashtag}/>
          <input type="button" className="form-control btn btn-secondary col-2 d-inline ml-3" value="Add"
                 onClick={(event) => props.onAddHashtagButtonClick(event)}/>
          <div className="d-block"> You've added {hashtags.length} hashtag(s)</div>
          <div className="d-block"> {hashtags.length ? hashtags.map(hashtag => {
            return (
              <div className="border border-secondary bg-light d-inline m-2" key={hashtag}> #{hashtag} </div>
            );
          }) : ''}
          </div>
        </div>
        <div className="form-group p-1">
          <label htmlFor="file">Add photo
          <input type="file" id="file" className="ml-1" accept="image" onChange={props.onPhotoChange}/>
          </label>
          <br/>
        </div>
        <div className="form-group d-flex justify-content-end">
          <input type="submit" className="btn btn-primary col-3 mr-3" value="Submit post"/>
        </div>
      </form>
    </div>
  );
}
