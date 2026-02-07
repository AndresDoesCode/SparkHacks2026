import { useState } from 'react'
import Login from './Pages/Login.jsx';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import SignUp from './Pages/SignUp.jsx';
import MainPage from './Pages/MainPage.jsx';
import Creators from './Pages/Creators.jsx';
import Portfolios from './Pages/Portfolios.jsx';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path='sign-up' element={<SignUp/>}/>
        <Route path='log-in' element={<Login/>}/>
        <Route path='creators' element={<Creators/>}/>
        <Route path='creators/:id' element={<Portfolios/>}/>
      </Route>
    </Routes>
    </>
  )

}

export default App
