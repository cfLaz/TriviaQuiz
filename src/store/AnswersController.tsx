// store/index.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'


export interface AnswerStateProps {
   userAnswer?: string
   setUserAnswer?: ({ qIndex, userAnswer }: SetUserAnswerProps) => void
   answerClicked?: boolean
   setAnswerClicked?: (clicked: boolean) => void
   currentAnswersOrder: Array<string>
   setCurrentAnswersOrder?: ({
      answers,
      currentQDataIndex,
   }: SetCurrentAnswersOrderProps) => void
   timerId?: NodeJS.Timeout
   setTimerId?: (timerId: NodeJS.Timeout) => void
}

const initialState: AnswerStateProps = {
   userAnswer: '',
   answerClicked: false,
   currentAnswersOrder: [],
   timerId: undefined,
}

const AnswersSlice = createSlice({
   name: 'AnswersController',
   initialState,
   reducers: {
      setUserAnswer: (state, action: PayloadAction<SetUserAnswerProps>) => {
         state.userAnswer = action.payload.userAnswer
      },
      setAnswerClicked: (state, action) => {
         state.answerClicked = action.payload
      },
      setCurrentAnswersOrder: (
         state,
         action: PayloadAction<SetCurrentAnswersOrderProps>
      ) => {
         state.currentAnswersOrder = action.payload.answers
      },
      setTimerId: (state, action) => {
         state.timerId = action.payload
      },
   },
})

export const {
   setAnswerClicked,
   setTimerId,
   setUserAnswer,
   setCurrentAnswersOrder,
} = AnswersSlice.actions

export default AnswersSlice

///
interface SetUserAnswerProps {
   qIndex: number
   userAnswer: string
}
export interface SetCurrentAnswersOrderProps {
   answers: Array<string>
   currentQDataIndex: number
}
