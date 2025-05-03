// store/index.ts
import { createSlice } from '@reduxjs/toolkit'
import { QuestionData } from '../api/getQuestions'
import { setUserAnswer } from './AnswersController'

export interface QuestionsStateProps {
   allQuestionsData: QuestionData[]
   setAllQuestionsData?: (data: QuestionData[]) => void
   currentQuestionData: QuestionData
   setCurrentQuestionData?: (data: QuestionData) => void
   currentQDataIndex: number
   setCurrentQDataIndex?: (index: number) => void
   questionStarted?: boolean
   setQuestionStarted?: (start: boolean) => void
   questionExpired?: boolean
   setQuestionExpired?: (expired: boolean) => void
}

const initialState: QuestionsStateProps = {
   allQuestionsData: [],
   currentQuestionData: {} as QuestionData,
   currentQDataIndex: -1,
   questionStarted: false,
   questionExpired: false,
}

const QuestionsSlice = createSlice({
   name: 'QuestionsController',
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
      setQuestionStarted: (state, action) => {
         state.questionStarted = action.payload
      },
      setQuestionExpired: (state, action) => {
         state.questionExpired = action.payload
      },
   },
   extraReducers: (builder) => {
      builder.addCase(setUserAnswer, (state, action) => {
         const { qIndex, userAnswer } = action.payload
         if (qIndex >= 0) {
            state.allQuestionsData[qIndex].userAnswer = userAnswer
         }
      })
      // .addCase(
      //    setCurrentAnswersOrder,
      //    (state, action: PayloadAction<SetCurrentAnswersOrderProps>) => {
      //       const { answers, currentQDataIndex } = action.payload
      //
      //       console.log('---setCurrentAnswersOrder extra reducer')
      //       state.allQuestionsData[currentQDataIndex].answersOrder = [
      //          ...answers,
      //       ]
      //    }
      // )
   },
})

export const {
   setAllQuestionsData,
   setCurrentQuestionData,
   setCurrentQDataIndex,
   setQuestionStarted,
   setQuestionExpired,
} = QuestionsSlice.actions

export default QuestionsSlice
