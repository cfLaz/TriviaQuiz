import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   AnswerStateProps,
   setAnswerClicked,
   setTimerId,
   setUserAnswer,
} from '../../store/AnswersController'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { Classes } from '../../util/Classes'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'
import { getShuffledArrayElements } from '../../util/arrays'

const AnswersContainer = () => {
   let [answers, setAnswers] = useState<string[]>([])
   const dispatch = useDispatch()

   const { currentQuestionData, currentQDataIndex } = useSelector(
      (state: { QuestionsState: QuestionsStateProps }) => state.QuestionsState
   )

   //to investigate: Why does this cause a bug on answer click?
   // const QASelector = (state: { QA: QAStateAndActions }) => state.QA;
   // const {currentQuestionData, currentQDataIndex} = useSelector(QASelector);

   useEffect(() => {
      dispatch(setUserAnswer({ userAnswer: '' }))
      if (!isObjectEmpty(currentQuestionData)) {
         setAnswers(
            getShuffledArrayElements([
               ...currentQuestionData?.incorrect_answers,
               currentQuestionData?.correct_answer,
            ])
         )
      }
   }, [currentQDataIndex])

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { timerId } = useSelector(AnswersSelector)

   const [clickedAnswerKey, setClickedAnswerKey] = useState<number>(0) //used just for styling

   const onAnswerClick = useCallback(
      ({ key, answerText }: AnswerClickProps) => {
         dispatch(setTimerId(clearTimeout(timerId)))
         dispatch(setAnswerClicked(true))
         setTimeout(() => {
            setClickedAnswerKey(key)
            //need anticipation sound in this step
         }, 500)
         setTimeout(() => {
            dispatch(setAnswerClicked(false))
            dispatch(
               setUserAnswer({
                  qIndex: currentQDataIndex,
                  userAnswer: answerText,
               })
            )
            setClickedAnswerKey(0)
         }, 2000)
      },
      [dispatch, currentQDataIndex]
   )

   return (
      <div className={Classes.answersContainer}>
         {answers
            ? answers.map((answer, index) => (
                 <Answer
                    num={index + 1}
                    clickedAnswerKey={clickedAnswerKey}
                    onAnswerClickCallback={onAnswerClick}
                    text={answer}
                    isCorrect={currentQuestionData.correct_answer == answer}
                 />
              ))
            : 'Loading...'}
      </div>
   )
}

export default AnswersContainer

export interface AnswerClickProps {
   key: number
   answerText: string
}
