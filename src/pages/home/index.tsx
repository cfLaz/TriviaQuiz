// import { useState } from 'react'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'

export function Home() {
   // return (

   /*    const [position, setPosition] = useState({ x: 0, y: 0 })

   const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({
         x: event.clientX,
         y: event.clientY,
      })
   }
 */
   return (
      <div className='homepage' /* onMouseMove={handleMouseMove} */>
         {/* <div
            className='cursorLight'
            style={{
               top: `${position.y}px`,
               left: `${position.x}px`,
            }}
         /> */}
         <div className='header'>
            <img className='logo' src={testpic}></img>
         </div>

         {/* <Link to='quiz'>Go to quiz</Link> */}
      </div>
   )
}
