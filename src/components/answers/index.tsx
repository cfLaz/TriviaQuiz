import { Classes } from '../../util/Classes'
import { Question } from './model'
import testData from './test'

const AnswersContainer = () => {
   let question = testData.results[4]
   let answers = shuffleArrayElements([
      ...question.incorrect_answers,
      question.correct_answer,
   ])

   return (
      <div className={Classes.answersContainer}>
         {answers.map((a, index) => (
            <div
               key={'q' + index}
               style={{ backgroundColor: 'white' }}
               className={Classes.answer}
            >
               {a}
            </div>
         ))}
      </div>
   )
}
export default AnswersContainer

function shuffleArrayElements(array: string[]): string[] {
   debugger
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}
