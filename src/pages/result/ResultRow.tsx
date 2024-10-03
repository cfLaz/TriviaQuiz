import { QuestionData } from '../../api/getQuestions'

export const ResultHeader = () => (
   //should it be a column for correct answer or not?
   //maybe it's better to have 4 answers, green for correct one, red for wrong one
   //
   <thead>
      <td>Question</td>
      <td colSpan={4}>Answers</td>
      <td>Difficulty</td>
      <td>Type</td>
   </thead>
)

export const ResultRow = ({ data }: { data: QuestionData }) => {
   return (
      <tr>
         <td>{data.question}</td>
         <td>{data.difficulty}</td>
         <td>{data.type}</td>
         <td>{data.userAnswer}</td>
         <td>{data.type}</td>
         <td>{data.type}</td>
         <td>{data.type}</td>
      </tr>
   )
}
