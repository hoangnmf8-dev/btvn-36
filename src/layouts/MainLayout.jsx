import React from 'react'
import Nav from '../component/Nav'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../stores/authStore'

export default function MainLayout() {
  const {token} = useAuth(state => state);
  
  let navList = [
    {
      id: 0,
      title: "Home", 
      path: "/"
    },
    {
      id: 1,
      title: "About", 
      path: "/about"
    },
    {
      id: 2,
      title: "Products", 
      path: "/products"
    },
    {
      id: 3,
      title: "Contact", 
      path: "/contact"
    },
    {
      id: 4,
      title: "Login", 
      path: "/login"
    },
  ]

  if(token?.access_token) {
    navList = navList.filter(nav => nav.title !== "Login");
  }
  return (
    <div>
      <Nav navList={navList}/>
      <hr />
      <Outlet />
    </div>
  )
}
