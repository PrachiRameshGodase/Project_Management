"use client";
import { OtherIcons } from "@/assests/icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { path: "/", icon: OtherIcons.home_svg, label: "Home" },
    { path: "/user-list", icon: OtherIcons.user_svg, label: "User" },
    { path: "/project-list", icon: OtherIcons.projects_svg, label: "Projects" },
    { path: "/client-list", icon: OtherIcons.clients_svg, label: "Clients" },
    
  ];

  return (
    <div className="w-full h-[80px] absolute left-0 flex items-center px-4 border-b border-gray-50  bg-white shadow-sm">
      <div className="w-[441px] h-[44px] absolute top-[20.5px] left-[80px] flex gap-2">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`rounded-lg flex items-center gap-1.5 px-2 py-1.5 cursor-pointer 
              ${pathname === item.path ? "border border-gray-300 bg-gray-100" : "opacity-70"} 
              ${(item.label === "Projects" || item.label === "Clients") ? "w-[110px] h-[44px]" : "w-[93px] h-[44px]"}`}
          
          >
            {item.icon}
            <span className="text-[18px] mt-1">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-[90px] flex items-center space-x-2">
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg" // Replace with actual avatar image URL
          alt="avatar"
          className="w-[42px] h-[42px] rounded-full"
        />
      </div>
    </div>
  );
};

export default NavBar;
