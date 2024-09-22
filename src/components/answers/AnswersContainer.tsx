import { useDispatch, useSelector } from 'react-redux'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { Classes } from '../../util/Classes'
import { getShuffledArrayElements } from '../../util/arrays'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'
import { useEffect } from 'react'
import { setUserAnswer } from '../../store/AnswersController'

const AnswersContainer = () => {
   const dispatch = useDispatch()

   const { currentQuestionData, currentQDataIndex } = useSelector(
      (state: { QuestionsState: QuestionsStateProps }) => state.QuestionsState
   )

   //TODO:Why does this cause a bug on answer click?
   // const QASelector = (state: { QA: QAStateAndActions }) => state.QA;
   // const {currentQuestionData, currentQDataIndex} = useSelector(QASelector);

   let answers
   if (!isObjectEmpty(currentQuestionData)) {
      answers = getShuffledArrayElements([
         ...currentQuestionData?.incorrect_answers,
         currentQuestionData?.correct_answer,
      ])
   }

   useEffect(() => {
      dispatch(setUserAnswer({ userAnswer: '' }))
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
