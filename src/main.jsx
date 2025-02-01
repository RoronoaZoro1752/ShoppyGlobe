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

//Define routes and configure navigation using createBrowserRouter
const route = createBrowserRouter([
  {
    path: '/', //Home route.
    element: <App />,
    errorElement: <Error />, //Shows Error component if the route doesn't exist.
    children:[
      {
        path: '/product/:id', //Dynamic route for individual product detail.
        element: <ProductDetails />
      },
      {
        index: true, //Default route when the app loads.
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
