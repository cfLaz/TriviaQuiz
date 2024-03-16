// QuestionBox.tsx

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { QuestionData, getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import {
   QAValues,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
} from '../../store'
import { getShuffledArrayElements } from '../../util/arrays'

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
         const questionsData = await getShuffledQuestionsData();
            dispatch(setAllQuestionsData(questionsData));
            dispatch(setCurrentQuestionData(questionsData[0]))
        
      }

      async function getShuffledQuestionsData(): Promise<QuestionData[]> {
         try {
            const [easyQuestionsData, mediumQuestionsData, hardQuestionsData] = await Promise.all([
               getRandomQuestions('easy'), getRandomQuestions('medium'), getRandomQuestions('hard')
            ]);
            return getShuffledArrayElements([...easyQuestionsData, ...mediumQuestionsData, ...hardQuestionsData])
         } catch (error) {
            //should deal with this globally, to have a consistent error handling 
            console.error(error);
            return []
         } 
      }
      fetchData()
   }, [])

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
