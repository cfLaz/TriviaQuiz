import { Classes } from '../../util/Classes'
import { Answer } from './Answer'
import { defaultEncoding } from '../../util/dummyData'
import { shuffleArrayElements } from '../../util/arrays'
const AnswersContainer = () => {
   let question = defaultEncoding.results[4]
   let answers = shuffleArrayElements([
      ...question.incorrect_answers,
      question.correct_answer,
   ])

   return (
      <div className={Classes.answersContainer}>
         {answers.map((a, index) => (
            <Answer num={index + 1} text={a} />
         ))}
      </div>
   )
}
export default AnswersContainer