// store/index.ts

import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'

export interface QAStateAndActions {
   allQuestionsData: QuestionData[]
   setAllQuestionsData?: (data: QuestionData[]) => void
   currentQuestionData: QuestionData
   setCurrentQuestionData?: (data: QuestionData) => void
   currentQDataIndex: number
   setCurrentQDataIndex?: (index: number) => void
   userAnswer?: string
   setUserAnswer?: (answer: string) => void
   answerClicked?: boolean
   setAnswerClicked?: (clicked: boolean) => void
   questionStarted?: boolean
   setQuestionStarted?: (start: boolean) => void
   questionExpired?: boolean
   setQuestionExpired?: (expired: boolean) => void
}

const initialState: QAStateAndActions = {
   allQuestionsData: [],
   currentQuestionData: {} as QuestionData,
   currentQDataIndex: -1,
   userAnswer: '',
   answerClicked: false,
   questionStarted: false,
   questionExpired: false,
}

const QAStore = createSlice({
   name: 'QA',
   initialState,
   reducers: {
      setAllQuestionsData: (state, action) => {
         state.allQuestionsData = action.payload
      },
      setCurrentQuestionData: (state, action) => {
         state.currentQuestionData = action.payload
      },
      setCurrentQDataIndex: (state, action) => {
         state.currentQDataIndex = action.payload
      },
      setAnswerClicked: (state, action) => {
         state.answerClicked = action.payload
      },
      setUserAnswer: (state, action) => {
         state.userAnswer = action.payload
      },
      setQuestionStarted: (state, action) => {
         state.questionStarted = action.payload
      },
      setQuestionExpired: (state, action) => {
         state.questionExpired = action.payload
      },
   },
})

// Create the Redux store
const store = configureStore({
   reducer: {
      QA: QAStore.reducer,
   },
})

// Export the actions
export const {
   setAllQuestionsData,
   setCurrentQuestionData,
   setAnswerClicked,
   setUserAnswer,
   setCurrentQDataIndex,
   setQuestionStarted,
   setQuestionExpired,
} = QAStore.actions

export default store
