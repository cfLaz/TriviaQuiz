// store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'

export interface AnswerStateProps {
   userAnswer?: string
   setUserAnswer?: (answer: string) => void
   answerClicked?: boolean
   setAnswerClicked?: (clicked: boolean) => void

   timerId?: NodeJS.Timeout
   setTimerId?: (timerId: NodeJS.Timeout) => void
}

const initialState: AnswerStateProps = {
   userAnswer: '',
   answerClicked: false,
   timerId: undefined,
}

const AnswersSlice = createSlice({
   name: 'AnswersController',
   initialState,
   reducers: {
      setUserAnswer: (state, action) => {
         state.userAnswer = action.payload
      },
      setAnswerClicked: (state, action) => {
         state.answerClicked = action.payload
      },
      setTimerId: (state, action) => {
         state.timerId = action.payload
      },
   },
})

export const { setAnswerClicked, setTimerId, setUserAnswer } =
   AnswersSlice.actions

export default AnswersSlice
