import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAnswerClicked, setUserAnswer } from '../../store/AnswersController'
import { QuestionsStateProps } from '../../store/QuestionsController'
import { getShuffledArrayElements } from '../../util/arrays'
import { Classes } from '../../util/Classes'
import { isObjectEmpty } from '../../util/object'
import { Answer } from './Answer'

type ClickPhase = 'idle' | 'clicked' | 'revealed'
interface ClickState {
   key: number
   phase: ClickPhase
}

const AnswersContainer = () => {
   let [answers, setAnswers] = useState<string[]>([])
   const dispatch = useDispatch()

   const { currentQuestionData, currentQDataIndex } = useSelector(
      (state: { QuestionsState: QuestionsStateProps }) => state.QuestionsState
   )

   const [clickState, setClickState] = useState<ClickState>({
      key: 0,
      phase: 'idle',
   })

   useEffect(() => {
      dispatch(setUserAnswer({ userAnswer: '' }))
      setClickState({ key: 0, phase: 'idle' })

      if (!isObjectEmpty(currentQuestionData)) {
         setAnswers(
            getShuffledArrayElements([
               ...currentQuestionData?.incorrect_answers,
               currentQuestionData?.correct_answer,
            ])
         )
      }
   }, [currentQDataIndex, currentQuestionData, dispatch])

   const onAnswerClick = useCallback(
      ({ key }: { key: number }) => {
         if (clickState.phase !== 'idle') return
         dispatch(setAnswerClicked(true))

         setClickState({ key, phase: 'clicked' })
      },
      [clickState.phase, dispatch]
   )

   useEffect(() => {
      if (clickState.phase === 'clicked') {
         setTimeout(() => {
            setClickState((prev) => ({ key: prev.key, phase: 'revealed' }))
            // need anticipation sound
         }, 1000)

         setTimeout(() => {
            if (clickState.key > 0) {
               const chosenAnswer = answers[clickState.key - 1]
               dispatch(setAnswerClicked(false))
               dispatch(
                  setUserAnswer({
                     qIndex: currentQDataIndex,
                     userAnswer: chosenAnswer,
                  })
               )
            }
            setClickState({ key: 0, phase: 'idle' })
         }, 2000)
      }
   }, [clickState.phase, clickState.key, answers, currentQDataIndex, dispatch])

   return (
      <div className={Classes.answersContainer}>
         {answers
            ? answers.map((answer, index) => (
                 <Answer
                    key={index + 1}
                    num={index + 1}
                    clickedKey={clickState.key}
                    clickPhase={clickState.phase}
                    onAnswerClickCallback={onAnswerClick}
                    text={answer}
                    isCorrect={currentQuestionData.correct_answer === answer}
                 />
              ))
            : 'Loading...'}
      </div>
   )
}

export default AnswersContainer
