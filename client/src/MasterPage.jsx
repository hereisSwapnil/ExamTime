import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer'

const MasterPage = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MasterPage