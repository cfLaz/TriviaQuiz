interface ClassObject {
   [className: string]: boolean | undefined
}

export function deriveClasses(classObj: ClassObject): string {
   return Object.entries(classObj).reduce((acc, [className, condition]) => {
      if (condition) {
         acc += className + ' '
      }
      return acc
   }, '')
}
