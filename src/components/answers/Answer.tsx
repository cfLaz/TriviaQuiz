import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   AnswerStateProps,
   setAnswerClicked,
   setTimerId,
   setUserAnswer,
} from '../../store/AnswersController'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { deriveClasses } from '../../util/deriveClasses'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { AnswerClickProps } from './AnswersContainer'

interface AnswerProps {
   num: number
   clickedAnswerKey: number
   onAnswerClickCallback: ({ key, answerText }: AnswerClickProps) => void
   text: string
   isCorrect: boolean
}

export const Answer = ({
   num,
   clickedAnswerKey,
   onAnswerClickCallback,
   text,
   isCorrect,
}: AnswerProps) => {
   const QuestionsSelector = (state: { QuestionsState: QuestionsStateProps }) =>
      state.QuestionsState
   const { questionExpired } = useSelector(QuestionsSelector)

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { answerClicked } = useSelector(AnswersSelector)

   return (
      <>
         <div
            key={num}
            className={deriveClasses({
               answer: true,
               answer_correct: isCorrect && clickedAnswerKey == num,
               answer_incorrect: !isCorrect && clickedAnswerKey == num,
               answer_expired: questionExpired,
               answer_disabled:
                  clickedAnswerKey != 0 && clickedAnswerKey != num,
            })}
            onClick={(e) => {
               if (!answerClicked && !questionExpired)
                  onAnswerClickCallback({ key: num, answerText: text })
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
