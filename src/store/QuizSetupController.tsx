// store/index.ts
import { createSlice } from '@reduxjs/toolkit'
import { SelectableCategory, SelectableDifficulty } from '../pages/home/util'

export interface QuizSetupProps {
   selectedDifficulty: SelectableDifficulty
   setDifficulty?: (difficulty: string) => void
   selectedCategory: SelectableCategory
   setCategory?: (category: string) => void
}

const initialState: QuizSetupProps = {
   selectedDifficulty: 'mixed',
   selectedCategory: 'mixed',
}

const QuizSetupSlice = createSlice({
   name: 'QuizSetupController',
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

export const { setDifficulty, setCategory } = QuizSetupSlice.actions

export default QuizSetupSlice
