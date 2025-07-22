import { QuestionData } from '../../api/getQuestions'
import { QuestionIcon } from '../../components/question/QuestionIcon'
import { deriveClasses } from '../../util/deriveClasses'

export const ResultHeader = () => (
   <thead>
      <tr>
         <th rowSpan={2}>#</th>
         <th rowSpan={2}>Question</th>
         <th colSpan={4}>Answers</th>
         <th rowSpan={2}>Category</th>
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
   const {
      question,
      correct_answer,
      userAnswer,
      incorrect_answers,
      type,
      category,
      difficulty,
   } = data

   let questionFontSizeClass = 'text-[16px]'

   if (question.length > 50) {
      questionFontSizeClass = 'text-[12px]'
   } else if (question.length > 30) {
      questionFontSizeClass = 'text-[14px]'
   }

   return (
      <tr>
         <td>{questionNum + 1}</td>
         <td className={`question ${questionFontSizeClass}`}>{question}</td>
         <td
            className={deriveClasses({
               green: correct_answer == userAnswer,
            })}
         >
            {correct_answer}
         </td>
         {type == 'multiple' ? (
            incorrect_answers.map((ia) => (
               <td
                  className={deriveClasses({
                     red: ia == userAnswer,
                     ['text-[14px]']: true,
                     ['text-[12px]']: ia.length > 30,
                     ['text-[10px]']: ia.length > 50,
                  })}
               >
                  {ia}
               </td>
            ))
         ) : (
            <td
               colSpan={3}
               className={deriveClasses({
                  red: incorrect_answers[0] == userAnswer,
               })}
            >
               {incorrect_answers[0]}
            </td>
         )}
         <td>
            <QuestionIcon category={category} className='w-[50px] m-auto' />
         </td>
         <td className='text-[12px]'>{difficulty}</td>
      </tr>
   )
}
