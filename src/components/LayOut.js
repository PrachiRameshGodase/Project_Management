import React from 'react'
import NavBar from './navBar'
// import { Providers } from '@/app/store/provider'

const LayOut = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* <Providers> */}
      <div className="flex flex-col min-h-screen p-2 mt-12 sm:mt-0 sm:p-8 md:p-12 lg:p-16 xl:p-20 pb-16 sm:pb-20 gap-8 sm:gap-12 md:gap-16">
        {children}
      {/* </Providers> */}
      </div>
    </div>

  )
}

export default LayOut
