// WheelPicker.tsx
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deriveClasses } from '../../../util/deriveClasses'

interface WheelPickerProps {
   segments: string[]
   storeReducer?: (value: string) => any
}

const WheelPicker: React.FC<WheelPickerProps> = ({
   segments,
   storeReducer,
}) => {
   const dispatch = useDispatch()
   const wheelRef = useRef<HTMLDivElement>(null)
   const startAngle = useRef<number | null>(null)
   const velocity = useRef(0)
   const frame = useRef(0)
   const tOut = useRef<number | null>(null)

   const [rotation, setRotation] = useState(0)
   const [selectedIndex, setSelectedIndex] = useState(0)
   const segmentAngle = 360 / segments.length

   // --- Mouse handlers ---
   const onDown = (e: React.MouseEvent) => {
      if (!wheelRef.current) return
      const rect = wheelRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      startAngle.current = Math.atan2(e.clientY - cy, e.clientX - cx)
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
      cancelAnimationFrame(frame.current)
   }

   const onMove = (e: MouseEvent) => {
      if (startAngle.current === null || !wheelRef.current) return
      const rect = wheelRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const a = Math.atan2(e.clientY - cy, e.clientX - cx)
      const diff = a - startAngle.current
      startAngle.current = a
      velocity.current = diff * (180 / Math.PI)
      setRotation((r) => r + velocity.current)
      debouncePick()
   }

   const onUp = () => {
      startAngle.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      spinMomentum()
   }

   // --- Momentum & picking ---
   const spinMomentum = () => {
      velocity.current *= 0.95
      setRotation((r) => {
         const next = r + velocity.current
         debouncePick(next)
         return next
      })
      if (Math.abs(velocity.current) > 0.01) {
         frame.current = requestAnimationFrame(spinMomentum)
      } else {
         finalizePick()
      }
   }

   const debouncePick = (r = rotation) => {
      if (tOut.current) clearTimeout(tOut.current)
      tOut.current = window.setTimeout(() => finalizePick(r), 100)
   }

   const finalizePick = (r = rotation) => {
      // 1) normalize rotation to [0,360)
      const norm = ((r % 360) + 360) % 360
      // 2) compute which original angle sits at 12 o'clock
      const angleAtTop = (360 - norm) % 360
      // 3) index = floor(angleAtTop / sliceAngle)
      const idx = Math.floor(angleAtTop / segmentAngle)
      setSelectedIndex(idx)
      dispatch(storeReducer?.(segments[idx]))
   }

   return (
      <div
         className='wheel'
         ref={wheelRef}
         style={{ transform: `rotate(${rotation}deg)` }}
         onMouseDown={onDown}
      >
         {segments.map((label, i) => {
            // break & shrink long text
            let fontSize = '5px'
            let text = label
            if (label.length > 7) {
               fontSize = '4px'
               const parts = label.match(/.{1,7}/g) || [label]
               text = parts.slice(0, 2).join('\n')
            }

            // each wedge always drawn from 0→sliceAngle, then rotated
            const arc = generateArcPath(50, 50, 0, 50, 0, segmentAngle)
            const start = segmentAngle * i

            return (
               <div
                  key={i}
                  className={deriveClasses({
                     segment: true,
                     selected: i === selectedIndex,
                  })}
                  style={{ transform: `rotate(${start}deg)` }}
               >
                  <svg viewBox='0 0 100 100' className='segment-svg'>
                     <defs>
                        <linearGradient
                           id='grad1'
                           x1='0%'
                           y1='0%'
                           x2='50%'
                           y2='50%'
                        >
                           <stop offset='0%' stopColor='#0000007a' />
                           <stop offset='100%' stopColor='#326273' />
                        </linearGradient>
                        <linearGradient
                           id='grad2'
                           x1='0%'
                           y1='0%'
                           x2='100%'
                           y2='0%'
                        >
                           <stop offset='0%' stopColor='#326273' />
                           <stop offset='100%' stopColor='#0000007a' />
                        </linearGradient>
                     </defs>

                     {/* fill */}
                     <path
                        d={arc}
                        fill={i % 2 === 0 ? 'url(#grad1)' : 'url(#grad2)'}
                     />
                     {/* dashed border */}
                     <path
                        d={arc}
                        fill='none'
                        stroke='white'
                        strokeWidth='1'
                        strokeDasharray='4,2'
                     />

                     {/* SVG text at the rim */}
                     {text.split('\n').map((line, j) => (
                        <text
                           key={j}
                           x='50'
                           y={12 + j * 7} /* push toward outer edge */
                           textAnchor='middle'
                           dominantBaseline='middle'
                           transform={`rotate(${segmentAngle / 2},50,50)`}
                           style={{
                              fill: 'white',
                              fontSize,
                              fontWeight: 'bold',
                              whiteSpace: 'pre',
                           }}
                        >
                           {line}
                        </text>
                     ))}
                  </svg>
               </div>
            )
         })}
      </div>
   )
}

// --- helpers ---
function generateArcPath(
   cx: number,
   cy: number,
   innerR: number,
   outerR: number,
   startA: number,
   endA: number
) {
   const pA = polar(cx, cy, outerR, endA)
   const pB = polar(cx, cy, outerR, startA)
   const pC = polar(cx, cy, innerR, startA)
   const pD = polar(cx, cy, innerR, endA)
   const large = endA - startA <= 180 ? '0' : '1'
   return [
      'M',
      pA.x,
      pA.y,
      'A',
      outerR,
      outerR,
      0,
      large,
      0,
      pB.x,
      pB.y,
      'L',
      pC.x,
      pC.y,
      'A',
      innerR,
      innerR,
      0,
      large,
      1,
      pD.x,
      pD.y,
      'Z',
   ].join(' ')
}

function polar(cx: number, cy: number, r: number, deg: number) {
   const rad = ((deg - 90) * Math.PI) / 180
   return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default WheelPicker
