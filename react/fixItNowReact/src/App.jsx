import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { lazy } from 'react';

const HomePage = lazy(() => import('./Components/HomePage'));


function App() {

  return (
    <HomePage />
  
  )
}

export default App
