import React from 'react';
import Resetbutton from "./Rese";

export default function Finished({ point, maxpoints, dispatch }) {
  const percentage = maxpoints > 0 ? (point / maxpoints) * 100 : 0;

  return (
    <div>
      <p className="result">
        You scored <strong>{point}</strong> out of {maxpoints} ({Math.ceil(percentage)}%)
      </p>
      <Resetbutton dispatch={dispatch} /> {/* Add the reset button */}
    </div>
  );
}
