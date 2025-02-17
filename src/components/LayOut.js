import React from 'react'
import NavBar from './navBar'

const LayOut = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <div className="flex flex-col  min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {children}
      </div>
    </div>
  )
}

export default LayOut
