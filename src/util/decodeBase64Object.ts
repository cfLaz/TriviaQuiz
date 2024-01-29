export function decodeBase64InObject(obj: any): any {
   const decodedObject: any = {}

   for (const key in obj) {
      if (typeof obj[key] === 'string') {
         try {
            decodedObject[key] = atob(obj[key])
         } catch (error) {
            decodedObject[key] = obj[key]
         }
      } else if (Array.isArray(obj[key])) {
         decodedObject[key] = obj[key].map((item: any) =>
            decodeBase64InObject(item)
         )
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
         decodedObject[key] = decodeBase64InObject(obj[key])
      } else {
         decodedObject[key] = obj[key]
      }
   }

   return decodedObject
}
