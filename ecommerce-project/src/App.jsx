import { Routes,Route } from 'react-router'
import {HomePage} from './pages/HomePage';
import {CheckoutPage} from './pages/CheckoutPage';
import { OrdersPages } from './pages/OrdersPage';
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />  
      <Route path="checkout" element={<CheckoutPage />}  /> 
      <Route path="orders" element={<OrdersPages />} />
    </Routes>
  )
}

export default App
