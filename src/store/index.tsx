// store/index.ts

import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'

export interface QAValues {
   allQuestionsData: QuestionData[]
   setAllQuestionsData?: (data: QuestionData[]) => void
   currentQuestionData: QuestionData
   currentQDataIndex: number
   setCurrentQuestionData?: (data: QuestionData) => void
   userAnswer?: string
   giveAnswer?: (answer: string) => void
}

const initialState: QAValues = {
   allQuestionsData: [],
   currentQuestionData: {} as QuestionData,
   currentQDataIndex: 0,
   userAnswer: '',
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
      setUserAnswer: (state, action) => {
         state.userAnswer = action.payload
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
   setUserAnswer,
   setCurrentQDataIndex,
} = QAStore.actions

export default store
