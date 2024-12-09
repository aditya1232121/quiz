import React from 'react';

export default function Resetbutton({ dispatch }) {
  return (
    <button className="btn-reset" onClick={() => dispatch({ type: 'reset' })}>
      Restart Quiz
    </button>
  );
}
