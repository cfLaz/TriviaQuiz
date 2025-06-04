// import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'
import TextContainer from '../../components/util/fancyPantsTextContainer'
import WheelPicker from '../../components/util/wheelPicker'
import {
   QuizSetupProps,
   setCategory,
   setDifficulty,
} from '../../store/QuizSetupController'
import { categories, difficulties } from './util'

export function Home() {
   const QuizSetup = (state: { QuizSetupState: QuizSetupProps }) =>
      state.QuizSetupState
   const { selectedDifficulty, selectedCategory } = useSelector(QuizSetup)

   return (
      <div className='homepage'>
         <div className='header'>
            <img className='logo' src={testpic}></img>
         </div>

         <TextContainer text='Choose your quiz setup' />

         <div className='pickers-container'>
            <div className='picker'>
               <p>Difficulty: {selectedDifficulty}</p>
               <WheelPicker
                  segments={difficulties}
                  storeReducer={setDifficulty}
               />
            </div>
            <div className='picker'>
               <p>Category: {selectedCategory}</p>
               <WheelPicker segments={categories} storeReducer={setCategory} />
            </div>
         </div>
         <div className='start-quiz-btn'>
            <Link to='/quiz'>Start the quiz</Link>
         </div>
      </div>
   )
}
