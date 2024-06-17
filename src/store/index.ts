// store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'
import QAStore from './QAStateAndActions'

// Create the Redux store
const store = configureStore({
   reducer: {
      QA: QAStore.reducer,
   },
})

export default store
