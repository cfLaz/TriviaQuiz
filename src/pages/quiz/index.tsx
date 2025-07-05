import AnswersContainer from '../../components/answers/AnswersContainer'
import QuestionBox from '../../components/question/QuestionBox'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../api/getQuestions'
import { setupCategories, setupQuestions } from './util'
import { AnswerStateProps } from '../../store/AnswersController'
import {
   QuestionsStateProps,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
   setQuestionExpired,
   setQuestionStarted,
} from '../../store/QuestionsController'
import { QuizSetupProps } from '../../store/QuizSetupController'

function Quiz() {
   console.log('aaa quiz rendering')

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
      questionExpired,
   } = useSelector(QuestionsSelector)

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { userAnswer } = useSelector(AnswersSelector)

   useEffect(() => {
      setupQuiz()
   }, [])

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
         return navigate('/result')
      }
      dispatch(setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1]))
      dispatch(setCurrentQDataIndex(currentQDataIndex + 1))
      dispatch(setQuestionExpired(false))
      dispatch(setQuestionStarted(true))
   }

   return (
      <div className='Quiz'>
         <QuestionBox
            currentQuestionData={currentQuestionData}
            currentQDataIndex={currentQDataIndex}
            questionExpired={questionExpired}
            quizStarted={quizStarted}
         />
         <AnswersContainer />
      </div>
   )
}

export default Quiz
