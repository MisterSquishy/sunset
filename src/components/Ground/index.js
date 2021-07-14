import React, { useCallback, useRef } from 'react'

import squirrel1 from '../../illustrations/squirrel/squrrel1.png'
import squirrel2 from '../../illustrations/squirrel/squrrel2.png'
import squirrel3 from '../../illustrations/squirrel/squrrel3.png'
import squirrel4 from '../../illustrations/squirrel/squrrel4.png'
import squirrel5 from '../../illustrations/squirrel/squrrel5.png'

import './style.css'

const SQUIRRELS = [
  squirrel1,
  squirrel2,
  squirrel3,
  squirrel4,
  squirrel5
]

const Ground = () => {
  const groundCanvasRef = useRef()

  const animate = useCallback((frame, progress) => {
    if (groundCanvasRef.current) {
      const squirrel = new Image();
      squirrel.src = SQUIRRELS[frame % SQUIRRELS.length]
      const context = groundCanvasRef.current.getContext('2d'); 
      context.clearRect(0, 0, groundCanvasRef.current.width, groundCanvasRef.current.height)
      context.drawImage(squirrel, groundCanvasRef.current.width - progress, 0);
    }
  }, [groundCanvasRef])

  let frame = 0
  let progress = 0
  setInterval(() => {
    animate(frame, progress)
    frame++
    if (progress > window.innerWidth + 400) {
      progress = 0
    } else {
      progress = progress + 10
    }
  }, 100);


  return <div className='ground'>
      <canvas ref={groundCanvasRef} width={window.innerWidth} height="500px" />
    </div>
}

export default Ground
