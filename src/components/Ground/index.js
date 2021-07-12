import React, { useRef } from 'react'

import squirrel from '../../illustrations/squirrel.png'

import './style.css'

const Ground = () => {
  const groundCanvasRef = useRef()
  return <div className='ground'>
      <canvas ref={groundCanvasRef} />
      <img src={squirrel} alt="squirrel" width="80px" />
    </div>
}

export default Ground
