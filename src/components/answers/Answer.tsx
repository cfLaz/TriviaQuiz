import { useDispatch, useSelector } from 'react-redux'
import {
   QAStateAndActions,
   setAnswerClicked,
   setTimerId,
   setUserAnswer,
} from '../../store/QAStateAndActions'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { deriveClasses } from '../../util/deriveClasses'
import { useEffect, useState } from 'react'

interface AnswerProps {
   num: number
   text: string
   isCorrect: boolean
}

export const Answer = ({ num, text, isCorrect }: AnswerProps) => {
   const dispatch = useDispatch()
   const QASelector = (state: { QA: QAStateAndActions }) => state.QA
   const {
      currentQuestionData,
      answerClicked,
      userAnswer,
      questionExpired,
      timerId,
   } = useSelector(QASelector)
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
