import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../api/getQuestions'
import { HC15questions } from '../../api/hardcoded15questions'
import question_expired from '../../assets/sounds/question_expired.wav'
import {
   QAStateAndActions,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
   setQuestionExpired,
   setQuestionStarted,
   setTimerId,
} from '../../store/QAStateAndActions'
import { QuizDataStateAndActions } from '../../store/QuizData'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { AnimatedRectangleTimer } from '../util/animatedRectangleTimer'
import { setupCategories, setupQuestions } from './util'

const QuestionBox = () => {
   const questionExpiredSoundEffect = useRef(new Audio(question_expired))

   const dispatch = useDispatch()
   const QuizSetup = (state: { QuizData: QuizDataStateAndActions }) =>
      state.QuizData
   const { selectedDifficulty, selectedCategory } = useSelector(QuizSetup)

   const QASelector = (state: { QA: QAStateAndActions }) => state.QA
   const {
      allQuestionsData,
      currentQuestionData,
      answerClicked,
      userAnswer,
      currentQDataIndex,
      questionStarted,
      questionExpired,
      timerId,
   } = useSelector(QASelector)

   useEffect(() => {
      setupQuiz()
      return () => {
         dispatch(setAllQuestionsData({}))
      }
   }, [setupQuiz])

   async function setupQuiz() {
      let result = await getCategories()
      const categories = setupCategories(result)

      console.log(result)
      console.log(categories)

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
      setupNextQuestion()
   } else if (questionExpired) {
      setTimeout(() => setupNextQuestion(), 1000)
   }

   function setupNextQuestion() {
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
