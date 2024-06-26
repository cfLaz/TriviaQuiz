import { useDispatch, useSelector } from 'react-redux'
import { QAStateAndActions, setUserAnswer } from '../../store/QAStateAndActions'
import { Classes } from '../../util/Classes'
import { getShuffledArrayElements } from '../../util/arrays'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'
import { useEffect } from 'react'

const AnswersContainer = () => {
   const currentQuestionData = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQuestionData
   )
   const currentQDataIndex = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQDataIndex
   )
   const dispatch = useDispatch()

   let answers
   if (!isObjectEmpty(currentQuestionData)) {
      answers = getShuffledArrayElements([
         ...currentQuestionData?.incorrect_answers,
         currentQuestionData?.correct_answer,
      ])
   }

   useEffect(() => {
      dispatch(setUserAnswer(''))
   }, [currentQDataIndex])

   return (
      <div className={Classes.answersContainer}>
         {answers
            ? answers.map((a, index) => (
                 <Answer
                    num={index + 1}
                    text={a}
                    isCorrect={currentQuestionData.correct_answer == a}
                 />
              ))
            : 'Loading...'}
      </div>
   )
}

export default AnswersContainer
