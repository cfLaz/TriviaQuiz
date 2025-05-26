import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../api/getQuestions'
import { AnswerStateProps } from '../../store/AnswersController'
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
import { Sounds } from '../../assets/sounds/Sounds'

const QuestionBox = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const [quizStarted, setQuizStarted] = useState(false)

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

   const answerClickedRef = useRef(answerClicked)
   const userAnswerRef = useRef(userAnswer)
   useEffect(() => {
      setupQuiz()
      // return () => { // handle going back to quiz setup, but not like this
      //    dispatch(setAllQuestionsData({}))
      // }
   }, [])

   useEffect(() => {
      answerClickedRef.current = answerClicked
   }, [answerClicked])

   useEffect(() => {
      userAnswerRef.current = userAnswer
   }, [userAnswer])

   useEffect(() => {
      if (userAnswer) {
         SetupNextQuestion()
      } else if (questionExpired) {
         setTimeout(() => SetupNextQuestion(), 1000)
      }
   }, [userAnswer, questionExpired])

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

            setQuizStarted(true)
         }
      } catch (error) {
         console.log(error)
         alert(error)
      }
   }

   function SetupNextQuestion() {
      if (currentQDataIndex == 2) {
         //this is also triggered once
         return navigate('/result')
      }
      dispatch(setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1]))
      dispatch(setCurrentQDataIndex(currentQDataIndex + 1))
      dispatch(setQuestionExpired(false))
      dispatch(setQuestionStarted(true))
   }

   const handleQuestionExpired = useCallback(() => {
      if (!answerClickedRef.current && !userAnswerRef.current) {
         Sounds.question.expired.play()
         dispatch(setQuestionExpired(true))
         dispatch(setQuestionStarted(false))
      }
   }, [dispatch])

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

            {quizStarted && (
               <AnimatedRectangleTimer
                  currentQuestionIndex={currentQDataIndex}
                  handleQuestionExpired={handleQuestionExpired}
               />
            )}

            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}

export default QuestionBox
