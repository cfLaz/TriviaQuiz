import { Classes } from '../../util/Classes'
import { base64Encoded } from '../../util/dummyData'

export default function QuestionBox() {
   let question = atob(base64Encoded.results[0].question)

   return (
      <div className={Classes.questionBox}>
         <div className='question'>{question}</div>
      </div>
   )
}
