import React from 'react'
import { Classes } from '../../util/Classes'

const AnswersContainer = () => {
   let questions = ['a', 'b', 'c', 'd']
   return (
      <div className={Classes.answersContainer}>
         {questions.map((q) => (
            <div> ASAAA</div>
         ))}
      </div>
   )
}

export default AnswersContainer
