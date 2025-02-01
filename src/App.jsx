import { Outlet } from 'react-router-dom'
import Header from './components/Header'


function App() {
  return (
    <>
      {/* Render the Header component at the top of every page */}
      <Header />
      {/* Outlet is where the matched route component will be rendered */}
      <Outlet />
    </>
  )
}

export default App
