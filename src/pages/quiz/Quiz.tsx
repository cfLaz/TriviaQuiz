import { useEffect, useState } from 'react'
import { QuestionsAndAnswers } from '../../Contexts'
import { getRandomQuestions } from '../../api/getQuestions'
import AnswersContainer from '../../components/answers/AnswersContainer'
import QuestionBox from '../../components/question/QuestionBox'

function Quiz() {
   return (
      <div className='Quiz'>
         <QuestionsAndAnswers>
            <QuestionBox />
            <AnswersContainer />
         </QuestionsAndAnswers>
      </div>
   )
}

export default Quiz
