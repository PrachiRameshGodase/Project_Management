import React from 'react'
import "./Loader.css"

const Loader = () => {
    return (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      );
}

export default Loader

export const ScreenFreezeLoader = () => {
  

  return (
    <div
    id="mainscreenfreezeloader"
    className="fixed bottom-4 right-4 bg-transparent z-[999999] flex items-center justify-center cursor-progress"
  >
    <div className="data-loader relative w-[100px] h-[100px] flex items-center justify-center">
      <div className="relative w-[80px] h-[15px] flex justify-between">
        <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-loader-1"></div>
        <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-loader-2"></div>
        <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-loader-2"></div>
        <div className="w-[10px] h-[10px] bg-gray-800 rounded-full animate-loader-3"></div>
      </div>
    </div>
  </div>
  );
};
