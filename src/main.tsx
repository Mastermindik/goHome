import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import App from './App.tsx'

const Cart = React.lazy(() => import('./pages/cart/Cart.tsx'))
const Login = React.lazy(() => import('./pages/Login/Login.tsx'))
const Registration = React.lazy(() => import('./pages/Registration/Registration.tsx'))
const Reviews = React.lazy(() => import('./pages/reviews/Reviews.tsx'))
const Apartment = React.lazy(() => import('./pages/apatrment/Apartment.tsx'))
const Home = React.lazy(() => import('./pages/home/Home.tsx'))

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "",
          index: true,
          element: <Home />
        },
        {
          path: "apartment/:id",
          element: <Apartment />,
        },
        {
          path: "apartment/:id/reviews",
          element: <Reviews />
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "signUp",
          element: <Registration />
        }
      ]
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
