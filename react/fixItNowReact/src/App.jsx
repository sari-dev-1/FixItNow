import Login from './Components/Login'
import './App.css'
import Header from './Components/Header'
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LazyLogin=React.lazy(()=>import("./Components/Login"))
const LazySignin=React.lazy(()=>import("./Components/SignIn"))
const LazyHomePage=React.lazy(()=>import("./Components/HomePage"))

function App() {
  return (
    <>
      <Header/>

      <Routes>
      <Route path='/' element={<Login />} />
        <Route path='/Login' element={<Suspense fallback={'loading...'}><LazyLogin /></Suspense>} /> 
        <Route path='/Signin' element={<Suspense fallback={'loading...'}><LazySignin /></Suspense>} />
        <Route path='/HomePage' element={<Suspense fallback={'loading...'}><LazyHomePage /></Suspense>} />
      </Routes>
    </>
  )
}
export default App



