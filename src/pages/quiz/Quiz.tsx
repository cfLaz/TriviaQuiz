import { useEffect, useState } from 'react'
import { AnswerProvider } from '../../Contexts'
import { getRandomQuestions } from '../../api/getQuestions'
import AnswersContainer from '../../components/answers/AnswersContainer'
import QuestionBox from '../../components/question/QuestionBox'

function App() {
   const [questions, setQuestions] = useState([])
   const [currentQuestion, setCurrentQuestion] = useState<string>('')
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const questions = await getRandomQuestions('easy')
            setQuestions(questions)
            setCurrentQuestion(questions[0].question)
            setIsLoading(false)
         } catch (error) {
            console.error('Error fetching questions:', error)
            setIsLoading(false)
         }
      }

      fetchData()
   }, [])

   return (
      <div className='App'>
         <AnswerProvider>
            <QuestionBox question={currentQuestion} loading={isLoading} />
            <AnswersContainer />
         </AnswerProvider>
      </div>
   )
}

export default App
