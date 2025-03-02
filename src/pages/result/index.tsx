import { shallowEqual, useSelector } from 'react-redux'
import finishedQuizData from './finishedQuizData'
import { ResultHeader, ResultRow } from './resultTableComponents'
import { QuestionsStateProps } from '../../store/QuestionsController'

const Result = () => {
   const allQuestionsData = useSelector(
      (state: { QuestionsState: QuestionsStateProps }) =>
         state.QuestionsState.allQuestionsData,
      shallowEqual
   )
   // const allQuestionsData = finishedQuizData() as any
   return (
      <div id='resultTable'>
         <table>
            <ResultHeader />
            <tbody>
               {allQuestionsData.map((qd: any, index: number) => (
                  <ResultRow data={qd} questionNum={index} />
               ))}
            </tbody>

            <tfoot></tfoot>
         </table>
      </div>
   )
}

export default Result
