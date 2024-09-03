import { configureStore, createSlice } from '@reduxjs/toolkit'
import QAStore from './QAStateAndActions'
import QuizSetupStore from './QuizSetup'

const store = configureStore({
   reducer: {
      QA: QAStore.reducer,
      QuizSetup: QuizSetupStore.reducer,
   },
})

export default store
