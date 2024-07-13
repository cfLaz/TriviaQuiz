import axios from 'axios'
import { API_BASE_URL, getWithParams } from './util'
import { decodeBase64Object } from './../util/decodeBase64Object'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mix';

export interface QuestionData {
   type: 'multiple' | 'boolean'
   difficulty: Difficulty
   category: string
   question: string
   correct_answer: string
   incorrect_answers: string[]
}

export async function getRandomQuestions(
   difficulty: Difficulty,
   category: string, //TODO
   amount = 15
): Promise<QuestionData[]> {
   if (amount < 1 || amount > 20) amount = 5
   const response = await getWithParams({
      difficulty,
      category,
      amount
   })
   let results: QuestionData[] = response.data.results.map((question: any) =>
      decodeBase64Object(question)
   )
   return results
}

export async function getCategories() {
   const result = await axios.get(`${API_BASE_URL}api_category.php`);
   return result.data.trivia_categories;
}
