import React from "react";

const UserProfile = (props) => {
  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>Age: {props.user.age}</p>
      <p>Bio: {props.user.bio}</p>
    </div>
  );
};

export default UserProfile;