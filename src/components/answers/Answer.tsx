import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnswerStateProps } from '../../store/AnswersController'
import {
   setAnswerClicked,
   setTimerId,
   setUserAnswer,
} from '../../store/AnswersController'
import { deriveClasses } from '../../util/deriveClasses'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { QuestionsStateProps } from '../../store/QuestionsController'

interface AnswerProps {
   num: number
   text: string
   isCorrect: boolean
}

export const Answer = ({ num, text, isCorrect }: AnswerProps) => {
   const dispatch = useDispatch()
   const QuestionsSelector = (state: { QuestionsState: QuestionsStateProps }) =>
      state.QuestionsState
   const { questionExpired } = useSelector(QuestionsSelector)

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { answerClicked, timerId } = useSelector(AnswersSelector)

   const [clickedAnswerKey, setClickedAnswerKey] = useState<number>(0)

   function answerClick(key: number) {
      dispatch(setTimerId(clearTimeout(timerId)))
      setAnswerClicked(true)
      setTimeout(() => {
         setClickedAnswerKey(key)
         //need anticipation sound in this step
      }, 1000)
      setTimeout(() => {
         dispatch(setAnswerClicked(false))
         dispatch(setUserAnswer(text))
         setClickedAnswerKey(0)
      }, 2000)
   }
   return (
      <>
         <div
            key={num}
            className={deriveClasses({
               answer: true,
               answer_correct: isCorrect && clickedAnswerKey == num,
               answer_incorrect: !isCorrect && clickedAnswerKey == num,
               answer_expired: questionExpired,
            })}
            onClick={(e) => {
               if (!answerClicked && !questionExpired) answerClick(num)
            }}
         >
            <div>{num}</div>
            <div>{text}</div>
            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}
function onCorrectAnimate() {}

function onWrongAnimate() {}
