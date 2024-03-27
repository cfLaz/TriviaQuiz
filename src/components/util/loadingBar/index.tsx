import React, { useState, useEffect } from 'react'

const LoadingBar = () => {
   const [progress, setProgress] = useState(0)

   useEffect(() => {
      const interval = setInterval(() => {
         if (progress < 100) {
            setProgress((prevProgress) => prevProgress + 1)
         }
      }, 100) // Increase progress every 100 milliseconds

      // Cleanup function
      return () => clearInterval(interval)
   }, [progress])

   return (
      <div className='loading-bar-container'>
         <div className='loading-bar' style={{ width: `${progress}%` }}></div>
      </div>
   )
}

export default LoadingBar
