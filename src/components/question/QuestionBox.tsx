import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { QuestionData, getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import {
   QAStateAndActions,
   setAllQuestionsData,
   setCurrentQDataIndex,
   setCurrentQuestionData,
   setQuestionExpired,
   setQuestionStarted,
   setTimerId,
} from '../../store'
import { AnimatedRectangleTimer } from '../util/animatedRectangleTimer'
import { getShuffledArrayElements } from '../../util/arrays'
import LoadingBar from '../util/loadingBar'
import { HC15questions } from '../../api/hardcoded15questions'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import question_expired from '../../assets/sounds/question_expired.wav'

const QuestionBox = () => {
   const questionExpiredSoundEffect = useRef(new Audio(question_expired))

   const dispatch = useDispatch()
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

   const fetchData = useCallback(async () => {
      const questionsData = HC15questions
      if (questionsData.length) {
         dispatch(setAllQuestionsData(questionsData))
         dispatch(setCurrentQuestionData(questionsData[0]))
         dispatch(setCurrentQDataIndex(0))
         dispatch(setQuestionStarted(true))
      } /*  async function getShuffledQuestionsData(): Promise<QuestionData[]> { try { const [easyQuestionsData, mediumQuestionsData, hardQuestionsData] = await Promise.all([ getRandomQuestions('easy'), new Promise<QuestionData[]>((resolve) => setTimeout( () => resolve(getRandomQuestions('medium')), 5000 ) ), new Promise<QuestionData[]>((resolve) => setTimeout( () => resolve(getRandomQuestions('hard')), 10000 ) ), ]) return getShuffledArrayElements([ ...easyQuestionsData, ...mediumQuestionsData, ...hardQuestionsData, ]) } catch (error) { //should deal with this globally, to have a consistent error handling console.error(error) return [] } } */
   }, [dispatch])

   useEffect(() => {
      fetchData()
   }, [fetchData])

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
               }, 8000)
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
               {allQuestionsData.length === 0 ? (
                  <div>Loading...</div>
               ) : (
                  currentQuestionData.question
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
