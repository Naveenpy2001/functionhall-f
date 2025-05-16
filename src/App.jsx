import './App.css'
import HomePage from './pages/MainPage'
import {Routes,Route} from 'react-router-dom'
import AdminBookingsPage from './pages/AdminBookingsPage'
import Contact from './components/Contact'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/admin' element={<AdminBookingsPage />} />
      <Route path='/contact' element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
