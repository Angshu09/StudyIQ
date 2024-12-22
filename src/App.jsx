import React from 'react'
import LeftBar from './Components/LeftBar/LeftBar'
import Home from './Components/Home/Home'

export default function App() {
  return (
    <main className='flex h-[100vh]'>
      <LeftBar/>
      <Home/>
    </main> 
  )
}
