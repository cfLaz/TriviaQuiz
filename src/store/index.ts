import { configureStore } from '@reduxjs/toolkit'
import QuestionsSlice from './QuestionsController'
import AnswersSlice from './AnswersController'
import QuizSetupSlice from './QuizSetupController'

const store = configureStore({
   reducer: {
      QuestionsState: QuestionsSlice.reducer,
      AnswersState: AnswersSlice.reducer,
      QuizSetupState: QuizSetupSlice.reducer,
   },
})

export default store
