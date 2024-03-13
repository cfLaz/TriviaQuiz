// QuestionBox.tsx

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import {
   QAValues,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
} from '../../store'

const QuestionBox = () => {
   const dispatch = useDispatch()

   const allQuestionsData = useSelector(
      (state: { QA: QAValues }) => state.QA.allQuestionsData
   )
   const currentQuestionData = useSelector(
      (state: { QA: QAValues }) => state.QA.currentQuestionData
   )
   const userAnswer = useSelector(
      (state: { QA: QAValues }) => state.QA.userAnswer
   )
   const currentQDataIndex = useSelector(
      (state: { QA: QAValues }) => state.QA.currentQDataIndex
   )

   const isLoading = allQuestionsData.length === 0

   useEffect(() => {
      const fetchData = async () => {
         try {
            const questionsData = await getRandomQuestions('easy')
            dispatch(setAllQuestionsData(questionsData))
            dispatch(setCurrentQuestionData(questionsData[0]))
         } catch (error) {
            console.error('Error fetching data:', error)
         }
      }

      fetchData()
   }, [dispatch])

   useEffect(() => {
      if (userAnswer === allQuestionsData[currentQDataIndex]?.correct_answer) {
         dispatch(
            setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1])
         )
         dispatch(setCurrentQDataIndex(currentQDataIndex + 1))
      }
   }, [userAnswer, dispatch])

   return (
      <div className={Classes.questionBox}>
         <div className='question'>
            {isLoading ? 'Loading...' : currentQuestionData.question}
         </div>
      </div>
   )
}

export default QuestionBox
