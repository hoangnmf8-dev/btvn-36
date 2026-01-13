import React from 'react'
import MainLayout from './layouts/MainLayout'
import UserLayout from "./layouts/UserLayout"
import { Routes, Route } from 'react-router-dom'
import Home from "./page/Home"
import About from "./page/About"
import Products from "./page/Products"
import Contact from "./page/Contact"
import Login from "./page/Login"
import ProductDetail from './page/ProductDetail'
import AuthMiddleWares from './middlewares/AuthMiddleWares'
import LoginMiddleWares from './middlewares/LoginMiddleWares'
import Dashboard from "./page/Dashboard"
import Account from "./page/Account"
import Password from "./page/Password"
import MyOrder from "./page/MyOrder"
import MyOrderDetail from "./page/MyOrderDetail"
import NotFound from './page/NotFound'
import { useAuth } from './stores/authStore'

export default function App() {
  return (
    <div className="max-w-300 mx-auto">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/products">
            <Route index element={<Products />}/>
            <Route path=":id" element={<ProductDetail />}/>
          </Route>
          <Route path="/contact" element={<Contact />}/>
          <Route element={<LoginMiddleWares/>}>
            <Route path="/login" element={<Login />}/>
          </Route>
        </Route>

        <Route element={<AuthMiddleWares/>}>
          <Route path="/users" element={<UserLayout />}>
            <Route index element={<Dashboard />}/>
            <Route path="password" element={<Password />}/>
            <Route path="account" element={<Account />}/>
            <Route path="order">
              <Route index element={<MyOrder />}/>
              <Route path=":id" element={<MyOrderDetail />}/>
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  )
}
