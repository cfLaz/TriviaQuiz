// store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'
import { SelectableCategory, SelectableDifficulty } from '../pages/home/util'

export interface QuizDataStateAndActions {
   selectedDifficulty: SelectableDifficulty
   setDifficulty?: (difficulty: string) => void
   selectedCategory: SelectableCategory
   setCategory?: (category: string) => void
}

const initialState: QuizDataStateAndActions = {
   selectedDifficulty: 'mixed',
   selectedCategory: 'mixed',
}

const QuizDataStore = createSlice({
   name: 'QuizData',
   initialState,
   reducers: {
      setDifficulty: (state, action) => {
         state.selectedDifficulty = action.payload
      },
      setCategory: (state, action) => {
         state.selectedCategory = action.payload
      },
   },
})

export const { setDifficulty, setCategory } = QuizDataStore.actions

export default QuizDataStore
