import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductDetail() {
  const {id} = useParams();
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate(`/users/order/${id}`);
  }
  return (
    <div className='mt-6'>
      <h1 className='font-semibold text-2xl mt-6'>ProductDetail: {id}</h1>
      <button className='border text-white rounded-2xl px-4 py-2 hover:cursor-pointer hover:bg-blue-700 transition duration-150 bg-blue-500 mt-6 font-semibold' onClick={handleOrder}>Order</button>
    </div>
  )
}
