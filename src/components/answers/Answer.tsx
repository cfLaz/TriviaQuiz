// CursorButton.tsx
import React, { useState } from 'react'
import { Classes } from '../../util/Classes'

interface AnswerProps {
   num: number
   text: string
}

export const Answer = ({ num, text }: AnswerProps) => {
   return (
      <>
         <div
            key={num}
            className={Classes.answer}
            // onClick={handleClick}
            // onMouseMove={handleMouseMove}
         >
            <div>{num}</div>
            <div>{text}</div>
         </div>
      </>
   )
}
