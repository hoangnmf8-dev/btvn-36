import React from 'react'
import { useParams } from 'react-router-dom'

export default function MyOrderDetail() {
  const {id} = useParams();
  
  return (
    <div>
      <h1 className='font-semibold text-2xl mt-6'>MyOrderDetail: {id}</h1>
    </div>
  )
}
