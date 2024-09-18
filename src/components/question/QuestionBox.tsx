import { useEffect, useRef } from 'react'
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
   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const {
      allQuestionsData,
      currentQuestionData,
      currentQDataIndex,
      questionStarted,
      questionExpired,
   } = useSelector(QuestionsSelector)

   const { answerClicked, userAnswer, timerId } = useSelector(AnswersSelector)

   useEffect(() => {
      setupQuiz()
      return () => {
         dispatch(setAllQuestionsData({}))
      }
   }, [])

   async function setupQuiz() {
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
   }

   useEffect(() => {
      if (questionStarted && !userAnswer && !answerClicked) {
         dispatch(
            setTimerId(
               setTimeout(() => {
                  {
                     questionExpiredSoundEffect.current.play()
                     dispatch(setQuestionExpired(true))
                     dispatch(setQuestionStarted(false))
                  }
               }, 15000)
            )
         )
      }
      return () => {
         dispatch(setTimerId(clearTimeout(timerId)))
      }
   }, [currentQDataIndex, dispatch])

   if (userAnswer) {
      SetupNextQuestion()
   } else if (questionExpired) {
      setTimeout(() => SetupNextQuestion(), 1000)
   }

   function SetupNextQuestion() {
      if (currentQDataIndex == 14) {
         return navigate('/result')
      }
      dispatch(setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1]))
      dispatch(setCurrentQDataIndex(currentQDataIndex + 1))
      dispatch(setQuestionExpired(false))
      dispatch(setQuestionStarted(true))
   }

   return (
      <>
         <div className='question-box'>
            <div className='question'>
               {allQuestionsData?.length === 0 ? (
                  <div>Loading...</div>
               ) : (
                  currentQuestionData?.question
               )}
            </div>

            {questionStarted && (
               <AnimatedRectangleTimer
                  resetDependancy={currentQuestionData}
                  pauseOn={!!answerClicked}
               />
            )}

            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}

export default QuestionBox
