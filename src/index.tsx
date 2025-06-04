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
import Result from './pages/result'
import reportWebVitals from './reportWebVitals'
import { Provider, useDispatch } from 'react-redux'
import store from './store'
import { setAllQuestionsData } from './store/QuestionsController'

const RoutesLayout = () => {
   const location = useLocation()
   const dispatch = useDispatch()

   useEffect(() => {
      if (location.pathname === '/home') {
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
         { index: true, element: <Navigate to='/home' replace /> },
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
