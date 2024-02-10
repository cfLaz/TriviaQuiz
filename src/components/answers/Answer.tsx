// CursorButton.tsx
import React, { useContext, useState } from 'react'
import { Classes } from '../../util/Classes'
import { AnswerContext } from '../../Contexts'

interface AnswerProps {
   num: number
   text: string
}

export const Answer = ({ num, text }: AnswerProps) => {
   // const [userAnswer, setUserAnswer] = useState<string>('');
   let { giveAnswer } = useContext(AnswerContext)

   return (
      <>
         <div
            key={num}
            className={Classes.answer}
            onClick={() => giveAnswer(text)}
         >
            <div>{num}</div>
            <div>{text}</div>
         </div>
      </>
   )
}
