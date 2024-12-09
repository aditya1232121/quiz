import React from 'react';

export default function Progress({ index, numquestions, point, maxpoints , answer }) {
  return (
    <header className='progress'>
<progress max = {numquestions} value = {index + Number
    (answer !== null)
} />

      <p>Question <strong>{index + 1}</strong> / {numquestions}</p>
      <p><strong>{point}</strong> / {maxpoints}</p>
    </header>
  );
}
