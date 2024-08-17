import React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.scss'
import { Home } from './pages/home'
import Quiz from './pages/quiz'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import Result from './pages/result';

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
//          <Route path='/quiz' element={<Quiz />} />
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
      element: <Quiz />,
   },
   {
      path: '/result',
      element: <Result />,
   },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   //</React.StrictMode>
)

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// ); ??

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
