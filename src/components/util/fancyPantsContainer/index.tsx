interface FancyContainerProps {
   className?: string
   children: React.ReactNode
}

const FancyContainer = ({ className, children }: FancyContainerProps) => {
   return <div className={`fancy-container ${className}`}>{children}</div>
}

export default FancyContainer
