import axios from 'axios'
import { API_BASE_URL, getWithParams } from './util'
import { decodeBase64Object } from './../util/decodeBase64Object'

export type Difficulty = 'easy' | 'medium' | 'hard' | '' | 'mixed' //mixed added just for typescript

export interface QuestionData {
   type: 'multiple' | 'boolean'
   difficulty: Difficulty
   category: string
   question: string
   correct_answer: string
   incorrect_answers: string[]
   //added
   userAnswer: string
   answersOrder: string[]
}
interface GetQuestionsParams {
   difficulty?: Difficulty
   category?: number | ''
   amount?: number
}

export async function getQuestions({
   difficulty = '',
   category = '',
   amount = 15,
}: GetQuestionsParams = {}): Promise<QuestionData[] | void> {
   if (amount < 1 || amount > 20) amount = 5
   try {
      const response = await getWithParams({
         difficulty,
         category,
         amount,
      })
      let results: QuestionData[] = response.data.results.map((question: any) =>
         decodeBase64Object(question)
      )
      return results
   } catch (error) {
      console.log(error)
      alert(error)
   }
}

export async function getCategories() {
   const result = await axios.get(`${API_BASE_URL}api_category.php`);
   return result.data.trivia_categories;
}
