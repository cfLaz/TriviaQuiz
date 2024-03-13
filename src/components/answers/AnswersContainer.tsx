import { useSelector } from 'react-redux'
import { QAValues } from '../../store'
import { Classes } from '../../util/Classes'
import { shuffleArrayElements } from '../../util/arrays'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'

const AnswersContainer = () => {
   const currentQuestionData = useSelector(
      (state: { QA: QAValues }) => state.QA.currentQuestionData
   )

   let answers
   if (!isObjectEmpty(currentQuestionData)) {
      answers = shuffleArrayElements([
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
