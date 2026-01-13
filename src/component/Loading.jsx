import React from 'react'

export default function Loading({width, borderColor}) {
  return (
    <div className={`spin ${width} aspect-square rounded-full border-3 border-dashed ${borderColor}`}></div>
  )
}
