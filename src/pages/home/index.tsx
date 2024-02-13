import { Link } from 'react-router-dom'

export function Home() {
   return (
      <div className='homepage'>
         <Link to='quiz'>Go to quiz</Link>
      </div>
   )
}
