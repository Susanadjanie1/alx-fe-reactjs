import React from 'react'

const UserProfile = () => {
    <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
   return (
     <div>
       <h2>{props.name}</h2>
       <p>Age: {props.age}</p>
       <p>Bio: {props.bio}</p>
     </div>
   );
 };


export default UserProfile