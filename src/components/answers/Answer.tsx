// Answer.tsx
import { useSelector } from 'react-redux'
import { deriveClasses } from '../../util/deriveClasses'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { AnswerStateProps } from '../../store/AnswersController'

interface AnswerProps {
   num: number
   clickedKey: number
   clickPhase: 'idle' | 'clicked' | 'revealed'
   onAnswerClickCallback: ({ key }: { key: number }) => void
   text: string
   isCorrect: boolean
}

export const Answer = ({
   num,
   clickedKey,
   clickPhase,
   onAnswerClickCallback,
   text,
   isCorrect,
}: AnswerProps) => {
   const { questionExpired } = useSelector(
      (state: { QuestionsState: QuestionsStateProps }) => state.QuestionsState
   )
   const { answerClicked } = useSelector(
      (state: { AnswersState: AnswerStateProps }) => state.AnswersState
   )
   
   let fontSizeClass = 'text-[18px]'
   if (text.length > 50) {
      fontSizeClass = 'text-[10px]'
   } else if (text.length > 30) {
      fontSizeClass = 'text-[14px]'
   }

   const className = deriveClasses({
      answer: true,
      answer_disabled: clickedKey !== 0 && clickedKey !== num,
      answer_correct:
         clickPhase === 'revealed' && clickedKey === num && isCorrect,
      answer_incorrect:
         clickPhase === 'revealed' && clickedKey === num && !isCorrect,
      answer_expired: questionExpired,
   })

   return (
      <button
         className={className}
         onClick={() => {
            if (!answerClicked && !questionExpired && clickPhase === 'idle') {
               onAnswerClickCallback({ key: num })
            }
         }}
         title={text}
      >
         <div>{num}</div>
         <div className={fontSizeClass}>{text}</div>

         {questionExpired && <QuestionExpiredOverlay />}
      </button>
   )
}
