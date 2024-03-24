import React, { useEffect, useRef } from 'react'
import anime from 'animejs/lib/anime.es.js'

interface AnimatedRectangleTimerProps {
   targetElementClass?: string
   width?: number
   height?: number
   borderRadius?: number
   duration?: number
   color?: string
   dependancy?: any
}

export function AnimatedRectangleTimer({
   ...props
}: AnimatedRectangleTimerProps) {
   const svgRef = useRef<SVGSVGElement | null>(null)
   const pathRef = useRef<SVGPathElement | null>(null)

   useEffect(() => {
      let element
      if (props.targetElementClass) {
         element = document.querySelector(props.targetElementClass)
      } else {
         element =
            svgRef.current?.parentNode instanceof Element
               ? svgRef.current.parentNode
               : null
      }
      if (element && svgRef.current && pathRef.current) {
         let { width, height } = element.getBoundingClientRect()
         const br = parseInt(
            window.getComputedStyle(element).borderRadius.slice(0, -2)
         )

         width = width - 12
         height = height - 12
         svgRef.current.style.position = 'absolute'
         svgRef.current.style.top = '0'
         svgRef.current.style.left = '0'
         svgRef.current.setAttribute('width', width.toString())
         svgRef.current.setAttribute('height', height.toString())

         pathRef.current.setAttribute(
            'd',
            `M ${br} 0 H ${width - br} A ${br} ${br} 0 0 1 ${width} ${br} V ${
               height - br
            } A ${br} ${br} 0 0 1 ${
               width - br
            } ${height} H ${br} A ${br} ${br} 0 0 1 0 ${
               height - br
            } V ${br} A ${br} ${br} 0 0 1 ${br} 0 Z`
         )

         const pathLength =
            2 * (width + height - 4 * br) + (8 * br * Math.PI) / 2
         pathRef.current.style.strokeDasharray = `${pathLength}`
         pathRef.current.style.strokeDashoffset = `${pathLength}`

         anime({
            targets: pathRef.current,
            strokeDashoffset: 0,
            easing: 'easeInOutSine',
            duration: 15000,
            loop: false,
         })
      }
   }, [props.targetElementClass, props.dependancy])

   return (
      <svg ref={svgRef}>
         <path
            id='animatedLine'
            ref={pathRef}
            stroke={props.color || 'white'}
            strokeWidth='4'
            fill='none'
         />
      </svg>
   )
}
