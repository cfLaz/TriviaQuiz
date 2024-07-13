// import { useState } from 'react'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'
import WheelPicker from '../../components/util/wheelPicker'
import { useDispatch, useSelector } from 'react-redux'
import { QuizDataStateAndActions, setCategory, setDifficulty } from '../../store/QuizData'
import TextContainer from '../../components/util/fancyPantsTextContainer'

export function Home() {
   /*    const [position, setPosition] = useState({ x: 0, y: 0 })

   const handleMouseMove = (event: React.MouseEvent) => {
      setPosition({
         x: event.clientX,
         y: event.clientY,
      })
   }
 */
   const QuizSetup = (state: { QuizData: QuizDataStateAndActions }) => state.QuizData
   const {
     difficulty,
     category,
   } = useSelector(QuizSetup)

   const difficulties = ['mixed', 'easy', 'medium', 'hard'];
   const categories = [
      'mixed',
      'general knowledge',
      'entertainment',
      'science',
      'sports',
      'geography',
      'history',
      'art',
   ];

   
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

         <TextContainer text='Choose your quiz setup' />
         <div className='pickers-container'>
            <div className='picker'>
               <p>Difficulty: {difficulty}</p>
               <WheelPicker
                  segments={difficulties}
                  storeReducer={setDifficulty}
               />
            </div>
            <div className='picker'>
               <p>Category: {category}</p>
               <WheelPicker segments={categories} storeReducer={setCategory} />
            </div>
         </div>
         <Link to='quiz'>Go to quiz</Link>
      </div>
   )
}
