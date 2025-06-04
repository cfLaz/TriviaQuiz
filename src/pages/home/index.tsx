// import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import testpic from '../../assets/pictures/TriviaQuiz.png'
import FancyContainer from '../../components/util/fancyPantsContainer'
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

         <FancyContainer>
            <span>Choose your quiz setup</span>
         </FancyContainer>

         <div className='pickers-container'>
            <div className='picker'>
               <FancyContainer className='flex justify-between gap-2 mb-4'>
                  <span>Difficulty: </span>
                  <span>{selectedDifficulty}</span>
               </FancyContainer>
               <WheelPicker
                  segments={difficulties}
                  storeReducer={setDifficulty}
               />
            </div>
            <div className='picker'>
               <FancyContainer className='flex justify-between gap-2 mb-4'>
                  <span>Category: </span>
                  <span>{selectedCategory}</span>
               </FancyContainer>
               <WheelPicker segments={categories} storeReducer={setCategory} />
            </div>
         </div>
         <div className='start-quiz-btn'>
            <Link to='/quiz'>Start the quiz</Link>
         </div>
      </div>
   )
}
