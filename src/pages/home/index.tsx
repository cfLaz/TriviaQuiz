// import { useState } from 'react'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'
import WheelPicker from '../../components/util/wheelPicker'

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

         <div className='pickers-container'>
            <div className='picker'>
               <p>test 1</p>
               <WheelPicker segments={['mix', 'easy', 'medium', 'hard']} />
            </div>
            <div className='picker'>
               <p>test 2</p>
               <WheelPicker segments={['mix', 'easy', 'medium', 'hard']} />
            </div>
         </div>
      </div>
   )
}
