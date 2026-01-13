import React from 'react'
import UserLayout from '../layouts/UserLayout'
import { Navigate, Outlet, useLocation} from 'react-router-dom'
import { useAuth } from '../stores/authStore';

export default function AuthMiddleWares() {
  const location = useLocation();
  const {token} = useAuth(state => state);

  return (
    <div>
      {token?.access_token ? <Outlet /> : <Navigate to={`/login?continue=${location.pathname}`} replace/>}
    </div>
  )
}
