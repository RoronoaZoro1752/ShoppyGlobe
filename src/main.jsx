import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from './components/Loading.jsx'
import Error from './components/Error.jsx'

const App = React.lazy(() => import('./App.jsx'))
const ProductDetails = React.lazy(() => import('./components/ProductDetails.jsx'))
const Product = React.lazy(() => import('./app/features/Product.jsx'))
const Cart = React.lazy(() => import('./components/Cart.jsx'))

const route = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        index: true,
        element: <Product />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading/>}>
        <RouterProvider router={route}/>
      </Suspense>
    </Provider>
  </StrictMode>,
)
