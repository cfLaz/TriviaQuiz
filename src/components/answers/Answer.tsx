import { useSelector } from 'react-redux'
import { AnswerStateProps } from '../../store/AnswersController'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { deriveClasses } from '../../util/deriveClasses'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { AnswerClickProps } from './AnswersContainer'

interface AnswerProps {
   num: number
   startClickedAnswerKey: number
   finishClickedAnswerKey: number
   onAnswerClickCallback: ({ key, answerText }: AnswerClickProps) => void
   text: string
   isCorrect: boolean
}

export const Answer = ({
   num,
   startClickedAnswerKey,
   finishClickedAnswerKey,
   onAnswerClickCallback,
   text,
   isCorrect,
}: AnswerProps) => {
   const QuestionsSelector = (state: { QuestionsState: QuestionsStateProps }) =>
      state.QuestionsState
   const { questionExpired } = useSelector(QuestionsSelector)

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { answerClicked } = useSelector(AnswersSelector)

   return (
      <>
         <div
            key={num}
            className={deriveClasses({
               answer: true,
               answer_correct: isCorrect && finishClickedAnswerKey == num,
               answer_incorrect: !isCorrect && finishClickedAnswerKey == num,
               answer_expired: questionExpired,
               answer_disabled:
                  startClickedAnswerKey != 0 && startClickedAnswerKey != num,
            })}
            onClick={(e) => {
               if (!answerClicked && !questionExpired)
                  onAnswerClickCallback({ key: num, answerText: text })
            }}
         >
            <div>{num}</div>
            <div>{text}</div>
            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}
function onCorrectAnimate() {}

function onWrongAnimate() {}
