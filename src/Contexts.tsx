import { ReactNode, createContext, useState } from 'react'

interface QandAContextValues {
   allQuestionsData: any[]
   setAllQuestionsData: (data: any[]) => void
   currentQuestionData: any
   setCurrentQuestionData: (data: any) => void
   userAnswer: string
   giveAnswer: (answer: string) => void
}

export const QandAContext = createContext<QandAContextValues>({
   allQuestionsData: [],
   setAllQuestionsData: () => {},
   currentQuestionData: {},
   setCurrentQuestionData: () => {},
   userAnswer: '',
   giveAnswer: () => {},
})

export const QuestionsAndAnswers = ({ children }: { children: ReactNode }) => {
   const [allQuestionsData, setQData] = useState([{}])
   const [currentQuestionData, setCurrentQData] = useState({})
   const [userAnswer, setUserAnswer] = useState('')

   const setAllQuestionsData = (allQuestionsData: any[]) =>
      setQData(allQuestionsData)
   const setCurrentQuestionData = (questionData: {}) =>
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
