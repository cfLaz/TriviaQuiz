import { useContext, useEffect, useState } from 'react'
import { getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import { AnswerContext } from '../../Contexts'

interface QuestionBoxProps {
   question: string
   loading: boolean
}
const QuestionBox = ({ question, loading }: QuestionBoxProps) => {
   let { userAnswer } = useContext(AnswerContext)
   return (
      <div
         className={Classes.questionBox}
         style={{
            backgroundColor: userAnswer == 'Indiana Jones' ? 'green' : 'black',
         }}
      >
         <div className='question'>{loading ? 'Loading...' : question}</div>
      </div>
   )
}

export default QuestionBox
