// CursorButton.tsx
import React, { useContext, useState } from 'react'
import { Classes } from '../../util/Classes'
import { QandAContext } from '../../Contexts'

interface AnswerProps {
   num: number
   text: string
}

export const Answer = ({ num, text }: AnswerProps) => {
   // const [userAnswer, setUserAnswer] = useState<string>('');
   let { giveAnswer } = useContext(QandAContext)

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
