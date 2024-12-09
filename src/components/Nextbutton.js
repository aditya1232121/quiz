import React from 'react'

export default function Nextbutton( { dispatch , answer}) {
  if(answer=== null) 
    return null ;
    return (
    <div>
<button className='btn btn-ui' onClick={() =>
    dispatch({type : 'nextquestion'})
}> Next </button> 


    </div>
  )
}
