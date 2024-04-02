import { useDispatch, useSelector } from 'react-redux'
import { QAStateAndActions, setUserAnswer } from '../../store'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'

interface AnswerProps {
   num: number
   text: string
}

export const Answer = ({ num, text }: AnswerProps) => {
   const dispatch = useDispatch()
   const currentQuestionData = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.currentQuestionData
   )
   const questionExpired = useSelector(
      (state: { QA: QAStateAndActions }) => state.QA.questionExpired
   )
   function answerQuestion(answerText: string) {
      // currentQuestionData.correct_answer == answerText
      //    ? onCorrectAnimate()
      //    : onWrongAnimate()

      dispatch(setUserAnswer(answerText))
   }

   return (
      <>
         <div
            key={num}
            className='answer'
            onClick={() => !questionExpired && answerQuestion(text)}
         >
            <div>{num}</div>
            <div>{text}</div>
            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )

   function onCorrectAnimate() {}
}

function onWrongAnimate() {}
