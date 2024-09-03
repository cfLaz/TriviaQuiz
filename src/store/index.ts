import { configureStore, createSlice } from '@reduxjs/toolkit'
import QAStore from './QAStateAndActions'
import QuizDataStore from './QuizSetup'

const store = configureStore({
   reducer: {
      QA: QAStore.reducer,
      QuizSetup: QuizDataStore.reducer,
   },
})

export default store
