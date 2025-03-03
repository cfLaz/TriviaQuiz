import { QuestionData } from '../../api/getQuestions'

export const ResultHeader = () => (
   //should it be a column for correct answer or not?
   //maybe it's better to have 4 answers, green for correct one, red for wrong one
   //
   <thead>
      <tr>
         <th rowSpan={2}>#</th>
         <th rowSpan={2}>Question</th>
         <th colSpan={4}>Answers</th>
         <th rowSpan={2}>Difficulty</th>
      </tr>
      <tr>
         <th>Correct</th>
         <th colSpan={3}>Incorrect</th>
      </tr>
   </thead>
)

interface RowProps {
   data: QuestionData
   questionNum: number
}
export const ResultRow = ({ data, questionNum }: RowProps) => {
   return (
      <tr>
         <td>{questionNum + 1}</td>
         <td className='question'>{data.question}</td>
         <td>{data.correct_answer}</td>
         {data.type == 'multiple' ? (
            data.incorrect_answers.map((ia) => <td>{ia}</td>)
         ) : (
            <td colSpan={3}>{data.incorrect_answers[0]}</td>
         )}
         <td>{data.difficulty}</td>
      </tr>
   )
}
