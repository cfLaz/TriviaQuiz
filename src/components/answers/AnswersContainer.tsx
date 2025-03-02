import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAnswer } from '../../store/AnswersController'
import {
   QuestionsStateProps,
   setAllQuestionsData,
} from '../../store/QuestionsController'
import { Classes } from '../../util/Classes'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'
import { getShuffledArrayElements } from '../../util/arrays'

const AnswersContainer = () => {
   let [answers, setAnswers] = useState<string[]>([])

   const dispatch = useDispatch()

   const { allQuestionsData, currentQuestionData, currentQDataIndex } =
      useSelector(
         (state: { QuestionsState: QuestionsStateProps }) =>
            state.QuestionsState
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

         // let updatedAllQuestionsData = structuredClone(allQuestionsData)
         // //so this should work
         // updatedAllQuestionsData[currentQDataIndex].answersOrder = answers
         // dispatch(setAllQuestionsData(updatedAllQuestionsData))
      }
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
