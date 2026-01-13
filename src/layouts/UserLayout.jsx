import React from 'react'
import Nav from '../component/Nav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  const navList = [
    {
      id: 0,
      title: "Dashboard", 
      path: "/users"
    },
    {
      id: 1,
      title: "Password", 
      path: "/users/password"
    },
    {
      id: 2,
      title: "Account", 
      path: "/users/account"
    },
    {
      id: 3,
      title: "My order", 
      path: "/users/order"
    },
  ]
  return (
    <div>
      <Nav navList={navList}/>
      <hr />
      <Outlet />
    </div>
  )
}
