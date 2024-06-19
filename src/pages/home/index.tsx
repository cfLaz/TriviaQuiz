// import { useState } from 'react'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'
import WheelPicker from '../../components/util/wheelPicker'
import { useDispatch } from 'react-redux'
import { setCategory, setDifficulty } from '../../store/QuizData'

export function Home() {
   /*    const [position, setPosition] = useState({ x: 0, y: 0 })

   const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({
         x: event.clientX,
         y: event.clientY,
      })
   }
 */

   const difficulties = ['mixed', 'easy', 'medium', 'hard']
   const categories = [
      'mixed',
      'general knowledge',
      'entertainment',
      'science',
      'sports',
      'geography',
      'history',
      'art',
   ]
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
            <div>Choose your quiz setup</div>
            <div className='picker'>
               <p>Difficulty: {}</p>
               <WheelPicker
                  segments={difficulties}
                  storeReducer={setDifficulty}
               />
            </div>
            <div className='picker'>
               <p>Category: {}</p>
               <WheelPicker segments={categories} storeReducer={setCategory} />
            </div>
         </div>
      </div>
   )
}
