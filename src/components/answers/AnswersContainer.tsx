import { Classes } from '../../util/Classes'
import { Answer } from './Answer'
import { defaultEncoding } from '../../util/dummyData'
import { shuffleArrayElements } from '../../util/arrays'
import { useContext } from 'react'
import { QandAContext } from '../../Contexts'
import { isObjectEmpty } from '../../util/object'

const AnswersContainer = () => {
   const { currentQuestionData } = useContext(QandAContext)
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