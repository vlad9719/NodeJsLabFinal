import React from 'react';

export default function Form(props) {
  const { users, mentionedUsers, selectedUser } = props;

  return (
    <div>
      <form className="border border-dark border-solid" encType="multipart/form-data" onSubmit={(event) => props.onSubmit(event)}>
        <input className="form-control col-12 border border-primary mt-1" id="text" placeholder="Add your comment..." onChange={props.onTextChange} value={props.text} required/>
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
          <label htmlFor="file">Add photo
            <input type="file" id="file" className="ml-1" accept="image" onChange={props.onPhotoChange}/>
          </label>
          <br/>
        </div>
        <div className="form-group d-flex justify-content-end">
          <input type="submit" className="btn btn-primary col-3 mr-3" value="Submit comment"/>
        </div>
      </form>
    </div>
  );
}
