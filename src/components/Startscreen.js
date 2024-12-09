import React from 'react';

export default function Startscreen({ numquestions , dispatch}) {
  return (
    <div>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numquestions} questions to test your React mastery</h3>
      <button className='btn btn-u1' onClick={()=> dispatch({type : "start"})}>Let's try</button>
    </div>
  );
}
