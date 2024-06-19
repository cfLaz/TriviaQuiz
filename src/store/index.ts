import { configureStore, createSlice } from '@reduxjs/toolkit'
import QAStore from './QAStateAndActions'
import QuizDataStore from './QuizData'

const store = configureStore({
   reducer: {
      QA: QAStore.reducer,
      QuizData: QuizDataStore.reducer,
   },
})

export default store
