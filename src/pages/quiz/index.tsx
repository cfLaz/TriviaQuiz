import AnswersContainer from '../../components/answers/AnswersContainer'
import QuestionBox from '../../components/question/QuestionBox'

function Quiz() {
   return (
      <div className='Quiz'>
         <QuestionBox />
         <AnswersContainer />
      </div>
   )
}

export default Quiz
