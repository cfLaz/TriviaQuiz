import { Difficulty, QuestionData, getQuestions } from '../../api/getQuestions'
import { SelectableCategory, SelectableDifficulty } from '../../pages/home/util'

interface CategoryFetched {
   id: number
   name: string
}

interface Categories {
   [key: string]: number | Array<number>
}

export function setupCategories(
   categories: Array<CategoryFetched>
): Categories {
   const categoryIds: Categories = {}
   const specialCategory = 'Science & Nature'

   categories.forEach((cat) => {
      const categoryNameSplitted = cat.name.split(': ')
      if (categoryNameSplitted.length < 2 && cat.name != specialCategory) {
         categoryIds[cat.name] = cat.id
      } else {
         const catName =
            categoryNameSplitted[0] === specialCategory
               ? 'Science'
               : categoryNameSplitted[0]
         categoryIds[catName]
            ? (categoryIds[catName] as number[]).push(cat.id)
            : (categoryIds[catName] = [cat.id])
      }
   })
   return categoryIds
}

////////////////////////////////////////////////////
interface SetupQuestionsProps {
   categories: Categories
   selectedCategory: SelectableCategory
   selectedDifficulty: SelectableDifficulty
}

export async function setupQuestions({
   categories,
   selectedCategory,
   selectedDifficulty,
}: SetupQuestionsProps) {
   let questionsData
   const mixed = 'mixed'

   try {
      if (selectedCategory === mixed && selectedDifficulty === mixed)
         questionsData = await getQuestions()
      else if (selectedCategory === mixed)
         //@ts-ignore-error
         questionsData = await getQuestions({ selectedDifficulty })
      else {
         const difficulty =
            selectedDifficulty === mixed ? '' : selectedDifficulty

         if (Array.isArray(categories[selectedCategory])) {
            const threeRandomIds = getThreeRandomIds(
               categories[selectedCategory] as Array<number>
            )
            const firstPart = await getQuestions({
               difficulty,
               category: threeRandomIds[0],
               amount: 5,
            })
            await delay(5000)
            const secondPart = await getQuestions({
               difficulty,
               category: threeRandomIds[1],
               amount: 5,
            })
            await delay(5000)
            const thirdPart = await getQuestions({
               difficulty,
               category: threeRandomIds[2],
               amount: 5,
            })
            //@ts-expect-error
            questionsData = [...firstPart, ...secondPart, ...thirdPart]
         } else {
            questionsData = getQuestions({
               difficulty,
               category: categories[selectedCategory] as number,
            })
         }
      }
      return questionsData
   } catch (error) {
      alert(error)
      console.log(error)
   }   
}

function getThreeRandomIds(IdsArray: Array<number>): Array<number> {
   const max = IdsArray.length

   const randomIds: Set<number> = new Set()

   while (randomIds.size < Math.min(3, max)) {
      const randomIndex = Math.floor(Math.random() * max)
      randomIds.add(randomIndex)
   }

   const result = Array.from(randomIds).map((index) => IdsArray[index])

   while (result.length < 3) {
      const randomIndex = Math.floor(Math.random() * max)
      result.push(IdsArray[randomIndex])
   }

   return result
}

function delay(ms: number): Promise<void> {
   return new Promise((resolve) => setTimeout(resolve, ms))
}
