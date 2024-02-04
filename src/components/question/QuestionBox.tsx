import { useEffect, useState } from 'react'
import { getFiveEasyQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'

const QuestionBox = () => {
   const [questions, setQuestions] = useState([])
   const [currentQuestion, setCurrentQuestion] = useState<string>('')
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const questions = await getFiveEasyQuestions()
            setQuestions(questions)
            setCurrentQuestion(atob(questions[0].question))
            setIsLoading(false)
         } catch (error) {
            console.error('Error fetching questions:', error)
            setIsLoading(false)
         }
      }

      fetchData()
   }, [])

   return (
      <div className={Classes.questionBox}>
         <div className='question'>
            {isLoading ? 'Loading...' : currentQuestion}
         </div>
      </div>
   )
}

export default QuestionBox
