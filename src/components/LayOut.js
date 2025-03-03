import React from 'react'
import NavBar from './navBar'
// import { Providers } from '@/app/store/provider'

const LayOut = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* <Providers> */}
        {children}
      {/* </Providers> */}
    </div>

  )
}

export default LayOut
