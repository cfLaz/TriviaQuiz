// QuestionBox.tsx

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { QuestionData, getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import {
   QAStateAndActions,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
   setQuestionStarted,
} from '../../store'
import { AnimatedRectangleTimer } from '../util/animatedRectangleTimer'
import { getShuffledArrayElements } from '../../util/arrays'
import LoadingBar from '../util/loadingBar'
import { HC15questions } from '../../api/hardcoded15questions'

const QuestionBox = () => {
   const dispatch = useDispatch()

   const allQuestionsData = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.allQuestionsData
   )
   const currentQuestionData = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQuestionData
   )
   const userAnswer = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.userAnswer
   )
   const currentQDataIndex = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQDataIndex
   )
   const questionStarted = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.questionStarted
   )

   useEffect(() => {
      const fetchData = async () => {
         // const questionsData = await getShuffledQuestionsData()
         const questionsData = HC15questions
         if (questionsData.length) {
            dispatch(setAllQuestionsData(questionsData))
            dispatch(setCurrentQuestionData(questionsData[0]))
            dispatch(setQuestionStarted(true))
         }
      }

      async function getShuffledQuestionsData(): Promise<QuestionData[]> {
         try {
            const [easyQuestionsData, mediumQuestionsData, hardQuestionsData] =
               await Promise.all([
                  getRandomQuestions('easy'),
                  new Promise<QuestionData[]>((resolve) =>
                     setTimeout(
                        () => resolve(getRandomQuestions('medium')),
                        5000
                     )
                  ),
                  new Promise<QuestionData[]>((resolve) =>
                     setTimeout(
                        () => resolve(getRandomQuestions('hard')),
                        10000
                     )
                  ),
               ])

            return getShuffledArrayElements([
               ...easyQuestionsData,
               ...mediumQuestionsData,
               ...hardQuestionsData,
            ])
         } catch (error) {
            //should deal with this globally, to have a consistent error handling
            console.error(error)
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
      <>
         <div className={Classes.questionBox}>
            <div className='question'>
               {allQuestionsData.length === 0 ? (
                  <div>Loading...</div>
               ) : (
                  currentQuestionData.question
               )}
            </div>

            {questionStarted && (
               <AnimatedRectangleTimer dependancy={currentQuestionData} />
            )}
         </div>
      </>
   )
}

export default QuestionBox
