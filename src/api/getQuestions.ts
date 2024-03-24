import axios from 'axios'
import { getWithParams } from './util'
import { decodeBase64Object } from './../util/decodeBase64Object'

type Difficulty = 'easy' | 'medium' | 'hard'

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
   amount = 5
): Promise<QuestionData[]> {
   if (amount < 1 || amount > 20) amount = 5
   const response = await getWithParams({
      difficulty,
      amount
   })
   let results: QuestionData[] = response.data.results.map((question: any) =>
      decodeBase64Object(question)
   )
   return results
}