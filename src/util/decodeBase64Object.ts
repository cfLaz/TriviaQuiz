export function decodeBase64Object(obj: any): any {
   const decodedObject: any = {}
   if (typeof obj === 'string') {
      return window.atob(obj)
   }

   for (const key in obj) {
      if (typeof obj[key] === 'string') {
         try {
            decodedObject[key] = window.atob(obj[key])
         } catch (error) {
            decodedObject[key] = obj[key]
         }
      } else if (Array.isArray(obj[key])) {
         decodedObject[key] = obj[key].map((item: any) =>
            decodeBase64Object(item)
         )
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
         decodedObject[key] = decodeBase64Object(obj[key])
      } else {
         decodedObject[key] = obj[key]
      }
   }
   
   return decodedObject
}
