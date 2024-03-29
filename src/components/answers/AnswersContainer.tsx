import { useSelector } from 'react-redux'
import { QAStateAndActions } from '../../store'
import { Classes } from '../../util/Classes'
import { getShuffledArrayElements } from '../../util/arrays'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'

const AnswersContainer = () => {
   const currentQuestionData = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQuestionData
   )

   let answers
   if (!isObjectEmpty(currentQuestionData)) {
      answers = getShuffledArrayElements([
         ...currentQuestionData?.incorrect_answers,
         currentQuestionData?.correct_answer,
      ])
   }

   return (
      <div className={Classes.answersContainer}>
         {answers
            ? answers.map((a, index) => <Answer num={index + 1} text={a} />)
            : 'Loading...'}
      </div>
   )
}

export default AnswersContainer
