// store/index.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'

export interface QuizDataStateAndActions {
   difficulty: 'medium' | 'mix' | 'easy' | 'hard'
   setDifficulty?: (difficulty: string) => void
   category: string //will be id in the API
   setCategory?: (category: string) => void
}

const initialState: QuizDataStateAndActions = {
   difficulty: 'mix',
   category: '',
}

const QuizDataStore = createSlice({
   name: 'QuizData',
   initialState,
   reducers: {
      setDifficulty: (state, action) => {
         state.difficulty = action.payload
      },
      setCategory: (state, action) => {
         state.category = action.payload
      },
   },
})

export const { setDifficulty, setCategory } = QuizDataStore.actions

export default QuizDataStore
