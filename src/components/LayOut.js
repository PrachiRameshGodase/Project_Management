"use client"
import NavBar from "./navBar";


const LayOut = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div
        style={{ minHeight: "calc(100vh - 80px)" }}
        className="flex flex-col min-h-screen px-2 mt-20 pt-3 sm:px-10 md:px-14 lg:px-20 xl:py-10 pb-6 sm:pb-10 gap-8 sm:gap-12 md:gap-16">
        {children}

      </div>
    </div>
  );
};

export default LayOut;
