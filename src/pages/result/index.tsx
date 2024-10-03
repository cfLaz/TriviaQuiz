import { useSelector } from 'react-redux'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { ResultHeader, ResultRow } from './ResultRow'
import finishedQuizData from './finishedQuizData'
import { QuestionData } from '../../api/getQuestions'

const Result = () => {
   //    const { allQuestionsData } = useSelector(
   //       (state: { QuestionsState: QuestionsStateProps }) => state.QuestionsState
   //    )

   const allQuestionsData = finishedQuizData() as any
   return (
      <div id='resultTable'>
         <table>
            <ResultHeader />
            <tbody>
               {allQuestionsData.map((qd: any) => (
                  <ResultRow data={qd} />
               ))}
            </tbody>

            <tfoot></tfoot>
         </table>
      </div>
   )
}

export default Result
