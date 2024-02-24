import { useContext, useEffect, useState } from 'react'
import { getRandomQuestions } from '../../api/getQuestions'
import { Classes } from '../../util/Classes'
import { QandAContext } from '../../Contexts'

const QuestionBox = () => {
   let {
      allQuestionsData,
      setAllQuestionsData,
      currentQuestionData,
      setCurrentQuestionData,
      userAnswer,
   } = useContext(QandAContext)

   const [currentQDataIndex, setCurrentQDataIndex] = useState<number>(0)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const questionsData = await getRandomQuestions('easy')
            setAllQuestionsData(questionsData)

            setCurrentQDataIndex(0)
            setCurrentQuestionData(questionsData[0])
            setIsLoading(false)
         } catch (error) {
            console.error('Error fetching data:', error)
            setIsLoading(false)
         }
      }

      fetchData()
   }, [])

   useEffect(() => {
      if (userAnswer == allQuestionsData[currentQDataIndex]?.correct_answer) {
         setCurrentQDataIndex((prevIndex) => prevIndex + 1)
         setCurrentQuestionData(allQuestionsData[currentQDataIndex + 1])
      }
   }, [userAnswer])

   return (
      <div
         className={Classes.questionBox}
         style={
            {
               // backgroundColor: userAnswer == 'Indiana Jones' ? 'green' : 'black',
            }
         }
      >
         <div className='question'>
            {isLoading ? 'Loading...' : currentQuestionData.question}
         </div>
      </div>
   )
}

export default QuestionBox
