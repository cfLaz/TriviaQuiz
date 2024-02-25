import { ReactNode, createContext, useState } from 'react'
import { QuestionData } from './api/getQuestions'

interface QandAContextValues {
   allQuestionsData: QuestionData[]
   setAllQuestionsData: (data: QuestionData[]) => void
   currentQuestionData: QuestionData
   setCurrentQuestionData: (data: QuestionData) => void
   userAnswer?: string
   giveAnswer: (answer: string) => void
}

export const QandAContext = createContext<QandAContextValues>({
   allQuestionsData: [],
   setAllQuestionsData: () => {},
   currentQuestionData: {} as QuestionData,
   setCurrentQuestionData: () => {},
   userAnswer: '',
   giveAnswer: () => {},
})

export const QuestionsAndAnswers = ({ children }: { children: ReactNode }) => {
   const [allQuestionsData, setQData] = useState<QuestionData[]>([])
   const [currentQuestionData, setCurrentQData] = useState<QuestionData>(
      {} as QuestionData
   )
   const [userAnswer, setUserAnswer] = useState<string>()

   const setAllQuestionsData = (allQuestionsData: QuestionData[]) =>
      setQData(allQuestionsData)

   const setCurrentQuestionData = (questionData: QuestionData) =>
      setCurrentQData(questionData)

   const giveAnswer = (answer: string) => setUserAnswer(answer)

   return (
      <QandAContext.Provider
         value={{
            userAnswer,
            giveAnswer,
            allQuestionsData,
            setAllQuestionsData,
            currentQuestionData,
            setCurrentQuestionData,
         }}
      >
         {children}
      </QandAContext.Provider>
   )
}
