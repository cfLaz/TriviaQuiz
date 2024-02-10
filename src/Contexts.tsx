import { ReactNode, createContext, useState } from 'react'

export const AnswerContext = createContext({
   userAnswer: '',
   giveAnswer: (answer: string): void => {},
})

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
   const [userAnswer, setUserAnswer] = useState('')

   const giveAnswer = (answer: string) => setUserAnswer(answer)

   return (
      <AnswerContext.Provider value={{ userAnswer, giveAnswer }}>
         {children}
      </AnswerContext.Provider>
   )
}
