import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../api/getQuestions'
import question_expired from '../../assets/sounds/question_expired.wav'
import { AnswerStateProps, setTimerId } from '../../store/AnswersController'
import {
   QuestionsStateProps,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
   setQuestionExpired,
   setQuestionStarted,
} from '../../store/QuestionsController'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { AnimatedRectangleTimer } from '../util/animatedRectangleTimer'
import { setupCategories, setupQuestions } from './util'
import { QuizSetupProps } from '../../store/QuizSetupController'

const QuestionBox = () => {
   const questionExpiredSoundEffect = useRef(new Audio(question_expired))

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const QuizSetup = (state: { QuizSetupState: QuizSetupProps }) =>
      state.QuizSetupState
   const { selectedDifficulty, selectedCategory } = useSelector(QuizSetup)

   const QuestionsSelector = (state: { QuestionsState: QuestionsStateProps }) =>
      state.QuestionsState
   const {
      allQuestionsData,
      currentQuestionData,
      currentQDataIndex,
      questionStarted,
      questionExpired,
   } = useSelector(QuestionsSelector)

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { answerClicked, userAnswer, timerId } = useSelector(AnswersSelector)

   useEffect(() => {
      setupQuiz()
      // return () => { // handle going back to quiz setup, but not like this
      //    dispatch(setAllQuestionsData({}))
      // }
   }, [])

   async function setupQuiz() {
      try {
         let result = await getCategories()
         const categories = setupCategories(result)

         const questions = await setupQuestions({
            categories,
            selectedCategory,
            selectedDifficulty,
         })
         if (questions?.length) {
            dispatch(setAllQuestionsData(questions))
            dispatch(setCurrentQuestionData(questions[0]))
            dispatch(setCurrentQDataIndex(0))
            dispatch(setQuestionStarted(true))
         }
      } catch (error) {
         console.log(error)
         alert(error)
      }
   }

   useEffect(() => {
      if (userAnswer) {
         SetupNextQuestion()
      } else if (questionExpired) {
         setTimeout(() => SetupNextQuestion(), 1000)
      }
   }, [userAnswer, questionExpired])

   function SetupNextQuestion() {
      if (currentQDataIndex == 14) {
         //this is also triggered once
         return navigate('/result')
      }
      dispatch(setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1]))
      dispatch(setCurrentQDataIndex(currentQDataIndex + 1))
      dispatch(setQuestionExpired(false))
      dispatch(setQuestionStarted(true))
   }

   const handleQuestionExpired = useCallback(
      (isExpired: true) => {
         if (answerClicked || userAnswer) {
            questionExpiredSoundEffect.current.play()
            dispatch(setQuestionExpired(isExpired))
            dispatch(setQuestionStarted(false))
         }
      },
      [dispatch]
   )

   return (
      <>
         <div className='question-box'>
            <div className='question'>
               {allQuestionsData?.length ? (
                  currentQuestionData?.question
               ) : (
                  <div>Loading...</div>
               )}
            </div>

            {questionStarted && (
               <AnimatedRectangleTimer
                  resetDependancy={currentQuestionData}
                  pauseOn={!!answerClicked}
                  handleQuestionExpired={handleQuestionExpired}
               />
            )}

            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}

export default QuestionBox
