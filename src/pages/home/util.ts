export type SelectableCategory =
   | 'mixed'
   | 'General knowledge'
   | 'Entertainment'
   | 'Science'
   | 'Sports'
   | 'Geography'
   | 'History'
   | 'Art'

export type SelectableDifficulty = 'mixed' | 'easy' | 'medium' | 'hard'

export const difficulties: Array<SelectableDifficulty> = [
   'mixed',
   'easy',
   'medium',
   'hard',
]
export const categories: Array<SelectableCategory> = [
   'mixed',
   'General knowledge',
   'Entertainment',
   'Science',
   'Sports',
   'Geography',
   'History',
   'Art',
]
