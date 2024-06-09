import React, { useRef, useState, useEffect } from 'react'

interface WheelPickerProps {
   segments: string[]
}

const WheelPicker: React.FC<WheelPickerProps> = ({ segments }) => {
   const [rotation, setRotation] = useState(0)
   const [closestSegment, setClosestSegment] = useState<string>('')
   const wheelPickerRef = useRef<HTMLDivElement>(null)
   const startAngle = useRef<number | null>(null)
   const velocity = useRef<number>(0)
   const animationFrame = useRef<number>(0)

   const handleMouseDown = (e: React.MouseEvent) => {
      if (wheelPickerRef.current) {
         const rect = wheelPickerRef.current.getBoundingClientRect()
         const centerX = rect.left + rect.width / 2
         const centerY = rect.top + rect.height / 2
         startAngle.current = Math.atan2(
            e.clientY - centerY,
            e.clientX - centerX
         )
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(animationFrame.current)
   }

   const handleMouseMove = (e: MouseEvent) => {
      if (wheelPickerRef.current && startAngle.current !== null) {
         const rect = wheelPickerRef.current.getBoundingClientRect()
         const centerX = rect.left + rect.width / 2
         const centerY = rect.top + rect.height / 2
         const newAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
         const angleDiff = newAngle - startAngle.current
         setRotation((prev) => prev + angleDiff * (180 / Math.PI))
         velocity.current = angleDiff * (180 / Math.PI)
         startAngle.current = newAngle
         updateClosestSegment()
      }
   }

   const handleMouseUp = () => {
      startAngle.current = null
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      animateMomentum()
   }

   const animateMomentum = () => {
      velocity.current *= 0.95
      setRotation((prev) => {
         const newRotation = prev + velocity.current
         updateClosestSegment(newRotation)
         return newRotation
      })
      if (Math.abs(velocity.current) > 0.01) {
         animationFrame.current = requestAnimationFrame(animateMomentum)
      } else {
         // Update the closest segment one last time after the momentum stops
         updateClosestSegment()
      }
   }

   const updateClosestSegment = (currentRotation = rotation) => {
      if (!wheelPickerRef.current) return
      const segments = wheelPickerRef.current.querySelectorAll('.segment')
      let closestElement: HTMLElement | null = null
      let closestDistance = Infinity

      segments.forEach((element) => {
         const rect = element.getBoundingClientRect()
         const distanceToTop = Math.abs(rect.top)

         if (distanceToTop < closestDistance) {
            closestDistance = distanceToTop
            closestElement = element as HTMLElement
         }
      })

      if (closestElement) {
         const textElement = (closestElement as HTMLElement).querySelector(
            '.text'
         )
         setClosestSegment(textElement?.textContent || '')
      }
   }

   useEffect(() => console.log(closestSegment), [closestSegment])
   const segmentAngle = 360 / segments.length

   return (
      <div>
         <div
            className='wheel'
            ref={wheelPickerRef}
            style={{ transform: `rotate(${rotation}deg)` }}
            onMouseDown={handleMouseDown}
         >
            {segments.map((text, index) => {
               const segmentRotation = segmentAngle * index
               return (
                  <div
                     key={index}
                     className='segment'
                     style={
                        {
                           transform: `rotate(${segmentRotation}deg)`,
                           '--index': `${index}`,
                           '--segments': `${segments.length}`,
                        } as React.CSSProperties
                     }
                  >
                     <div
                        className='text'
                        style={{
                           transform: `rotate(-${
                              segmentRotation + segmentAngle / 2
                           }deg)`,
                        }}
                     >
                        {text}
                     </div>
                  </div>
               )
            })}
         </div>
         {closestSegment && <div>Closest segment: {closestSegment}</div>}
      </div>
   )
}

export default WheelPicker
