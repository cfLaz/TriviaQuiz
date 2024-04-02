export const QuestionExpiredOverlay = () => (
   <div
      style={{
         position: 'absolute',
         top: 0,
         left: 0,
         width: '100%',
         height: '100%',
         background:
            'repeating-linear-gradient(135deg, #ccc, #ccc 10px, #666 10px, #666 20px)',
         opacity: 0.2,
         zIndex: 3,
      }}
   />
)
