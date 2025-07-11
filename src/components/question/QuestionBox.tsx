import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sounds } from '../../assets/sounds/Sounds'
import { AnswerStateProps } from '../../store/AnswersController'
import {
   QuestionsStateProps,
   setQuestionExpired,
   setQuestionStarted,
} from '../../store/QuestionsController'
import { QuestionExpiredOverlay } from '../util/QuestionExpiredOverlay'
import { AnimatedRectangleTimer } from '../util/animatedRectangleTimer'
import { QuestionIcon } from './QuestionIcon'

interface QuestionBoxProps {
   quizStarted: boolean
   currentQuestionData: QuestionsStateProps['currentQuestionData']
   questionExpired?: boolean
   currentQDataIndex: number
}

const QuestionBox = ({
   quizStarted,
   currentQuestionData,
   questionExpired,
   currentQDataIndex,
}: QuestionBoxProps) => {
   const dispatch = useDispatch()

   const AnswersSelector = (state: { AnswersState: AnswerStateProps }) =>
      state.AnswersState
   const { answerClicked, userAnswer } = useSelector(AnswersSelector)

   const answerClickedRef = useRef(answerClicked)
   const userAnswerRef = useRef(userAnswer)

   useEffect(() => {
      answerClickedRef.current = answerClicked
   }, [answerClicked])

   useEffect(() => {
      userAnswerRef.current = userAnswer
   }, [userAnswer])

   const handleQuestionExpired = useCallback(() => {
      if (!answerClickedRef.current && !userAnswerRef.current) {
         Sounds.question.expired.play()
         dispatch(setQuestionExpired(true))
         dispatch(setQuestionStarted(false))
      }
   }, [dispatch])

   return (
      <>
         <div className='question-box'>
            {quizStarted && (
               <AnimatedRectangleTimer
                  currentQuestionIndex={currentQDataIndex}
                  handleQuestionExpired={handleQuestionExpired}
               />
            )}
            <div className='absolute right-[3%] bottom-[4%]'>
               <QuestionIcon category={currentQuestionData.category} />
            </div>
            <div className='question'>
               {currentQuestionData?.question || <div>Loading...</div>}
            </div>
            {questionExpired && <QuestionExpiredOverlay />}
         </div>
      </>
   )
}

export default QuestionBox
