import axios from 'axios'
import { getWithParams } from './util'

export async function getFiveEasyQuestions() {
   const response = await getWithParams({ difficulty: 'easy', amount: 5 })
   return response.data.results
}

export function getFiveMediumQuestions() {}

export function getFiveHardQuestions() {}
