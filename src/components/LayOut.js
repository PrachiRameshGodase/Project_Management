import React from 'react'
import NavBar from './navBar'

const LayOut = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 pb-16 sm:pb-20 gap-8 sm:gap-12 md:gap-16">
        {children}
      </div>
    </div>

  )
}

export default LayOut
