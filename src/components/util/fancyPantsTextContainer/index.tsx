type HexColor = `#${string}`

interface TextContainerProps {
   text: string
   color1?: HexColor
   color2?: HexColor
}

const TextContainer = ({ text, color1, color2 }: TextContainerProps) => {
   return (
      <div className='text-container'>
         <span>{text}</span>
      </div>
   )
}

export default TextContainer
