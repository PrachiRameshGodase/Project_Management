import React from 'react'
import NavBar from './navBar'
// import { Providers } from '@/app/store/provider'

const LayOut = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* <Providers> */}
      <div className="flex flex-col min-h-screen px-1 mt-20 pt-3   sm:px-4 md:px-8 lg:px-16 xl:py-10 pb-6 sm:pb-10 gap-8 sm:gap-12 md:gap-16">
        {children}
        {/* </Providers> */}
      </div>
    </div>

  )
}

export default LayOut
