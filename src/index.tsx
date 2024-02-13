import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './index.scss'
import {
   Link,
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from 'react-router-dom'
import { Home } from './pages/home'

// const router = createBrowserRouter(
//    createRoutesFromElements(
//       <Route>
//          <Route
//             path='/'
//             element={
//                <div>
//                   <h1>Hello World</h1>
//                   <Link to='/quiz'>Go to quiz</Link>
//                </div>
//             }
//          >
//          </Route>
//          <Route path='/quiz' element={<App />} />
//       </Route>
//    )
// )
const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />,
   },
   {
      path: '/quiz',
      element: <App />,
   },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
)

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// ); ??

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
