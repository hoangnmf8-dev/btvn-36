import React from 'react'
import { useAuth } from '../stores/authStore'
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';

export default function LoginMiddleWares() {
  const {token} = useAuth(state => state);
  const [searchParam, setSearchParam] = useSearchParams();
  const pathname = searchParam.get("continue") || "/";
  //Do setToken nhanh nên chạy vào trong middlewares vì middlewares sử dụng giá trị của store nên sẽ re-render, do vậy nên xử lý chuyển hướng ở middlewares
  
  return (
    <div>
      {token?.access_token ? <Navigate to={pathname} replace/> : <Outlet />}
    </div>
  )
}
