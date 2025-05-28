import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
   Navigate,
   Outlet,
   RouterProvider,
   createBrowserRouter,
   useLocation,
} from 'react-router-dom'
import './index.scss'
import { Home } from './pages/home'
import Quiz from './pages/quiz'
import reportWebVitals from './reportWebVitals'
import { Provider, useDispatch } from 'react-redux'
import store from './store'
import Result from './pages/result'
import { setAllQuestionsData } from './store/QuestionsController'

const RoutesLayout = () => {
   const location = useLocation()
   const dispatch = useDispatch()

   useEffect(() => {
      if (location.pathname === '/' || location.pathname === '/home') {
         dispatch(setAllQuestionsData([]))
      }
   }, [location.pathname, dispatch])

   return <Outlet />
}

const router = createBrowserRouter([
   {
      path: '/',
      element: <RoutesLayout />,
      children: [
         { path: '', element: <Home /> },
         { path: 'home', element: <Home /> },
         { path: 'quiz', element: <Quiz /> },
         { path: 'result', element: <Result /> },
         { path: '*', element: <Navigate to='/home' replace /> },
      ],
   },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
   <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
)

reportWebVitals()

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// ); ??

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
