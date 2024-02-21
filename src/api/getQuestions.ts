import axios from 'axios'
import { getWithParams } from './util'
import { decodeBase64Object } from './../util/decodeBase64Object'

type Difficulty = 'easy' | 'medium' | 'hard'

export async function getRandomQuestions(difficulty: Difficulty, amount = 5) {
   if (amount < 1 || amount > 20) amount = 5
   const response = await getWithParams({
      difficulty: difficulty,
      amount: amount,
   })
   let results = response.data.results.map((question: any) =>
      decodeBase64Object(question)
   )
   return results
}