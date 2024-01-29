import { Classes } from '../../util/Classes'
import { Answer } from './Answer'
import { defaultEncoding } from '../../util/dummyData'
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

function shuffleArrayElements(array: string[]): string[] {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}
