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
  ];

  return (
    <div className="w-full h-[80px] absolute left-0 flex items-center px-4 border-b border-gray-50  bg-white">
      <div className="w-[441px] h-[39px] absolute top-[20.5px] left-[78.3px] flex gap-4">
        {navItems.map((item) => (
          <div
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-[93px] h-[39px] rounded-lg flex items-center gap-1.5 px-2 py-1.5 cursor-pointer 
            ${
              pathname === item.path
                ? "border border-gray-300"
                : "opacity-70 "
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex items-center space-x-2">
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
