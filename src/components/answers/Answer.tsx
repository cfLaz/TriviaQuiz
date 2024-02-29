import { useContext } from 'react'
import { QandAContext } from '../../Contexts'

interface AnswerProps {
   num: number
   text: string
}

export const Answer = ({ num, text }: AnswerProps) => {
   let { giveAnswer, currentQuestionData } = useContext(QandAContext)

   function answerQuestion(answerText: string) {
      // currentQuestionData.correct_answer == answerText
      //    ? onCorrectAnimate()
      //    : onWrongAnimate()

      giveAnswer(answerText)
   }

   return (
      <>
         {/* <div id={'silverline' + num} className='silverline' /> */}
         <div key={num} className='answer' onClick={() => answerQuestion(text)}>
            <div>{num}</div>
            <div>{text}</div>
         </div>
      </>
   )

   function onCorrectAnimate() {}
}

function onWrongAnimate() {}
