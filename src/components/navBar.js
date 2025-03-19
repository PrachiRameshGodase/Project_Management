"use client"
import { OtherIcons } from "@/assests/icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import UserAvatar from "./common/UserAvatar/UserAvatar";
import { Bell, LogOutIcon, Trash } from "lucide-react";
import { deleteNotification, fetchNotification, markAsReadNotification } from "@/app/store/notificationSlice";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useUserData from "./common/Helper/useUserData";
import TableSkeleton from "./common/TableSkeleton/TableSkeleton";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const userData = useUserData()
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const [isOpen2, setIsOpen2] = useState(false); // State for mobile menu
  const isActive = userData?.status == 0 ? true : false

  const notificationListData = useSelector((state) => state.notification?.list?.data);
  const notificationListLoading = useSelector((state) => state.notification);

  const isEmployee = userData?.is_employee == 0

  const navItems = [
    { path: "/home", icon: OtherIcons.home_svg, label: "Home" },
    { path: ["/user/list", "/user/add", "/user/details"], icon: OtherIcons.user_svg, label: "User" },
    { path: ["/project/list", "/project/add", "/project/details", "/project/add-task"], icon: OtherIcons.projects_svg, label: "Projects" },
    isEmployee && { path: ["/client/list", "/client/add", "/client/details"], icon: OtherIcons.clients_svg, label: "Clients" },
  ]

  // console.log("notificationListData", notificationListData)

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login"); // Redirect to login page if token not found
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
    toast.success("Logout Successful!");

  };




  useEffect(() => {
    if (!userData?.id) return; // Prevent unnecessary calls

    const fetchNotifications = () => {
      const sendData = { user_id: userData.id };
      dispatch(fetchNotification({ sendData }));
    };

    // Call API immediately
    fetchNotifications();

    // Set interval to call API every 2 minutes (120,000 ms)
    const interval = setInterval(fetchNotifications, 6000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [dispatch, userData?.id]);





  const [hasNotificationBlink, setHasNotificationBlink] = useState(false);

  const hasNotification = notificationListData?.some(
    (notification) => notification.is_mark_read === 0
  );


  useEffect(() => {
    if (hasNotification) {
      const interval = setInterval(() => {
        setHasNotificationBlink((prev) => !prev);
      }, 1000); // Blink every 1 second

      return () => clearInterval(interval); // Cleanup interval
    } else {
      setHasNotificationBlink(false); // Ensure it stops blinking when no unread notifications
    }
  }, [hasNotification]); // Depend on hasNotification


  useEffect(() => {
    if (isOpen && userData?.id) {
      dispatch(markAsReadNotification({ user_id: userData.id }));
    }
  }, [isOpen, userData?.id, dispatch])

  const handleClearNotifications = () => {
    if (userData?.id) {
      dispatch(deleteNotification({ user_id: userData.id }));
    }
  };
  return (
    <div className="w-full z-50 h-[80px] fixed  flex items-center shadow-nav-Shadow  border-b border-gray-50 bg-white ">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden text-2xl absolute p-2 left-2 sm:left-10 md:left-14  lg:left-20 rounded-md focus:outline-none "
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
          <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Desktop Navbar */}
      <div className="hidden  lg:flex w-[441px] h-[44px] absolute top-[20.5px] left-2 sm:left-10 md:left-14  lg:left-20 gap-2">
        {navItems.map((item, index) => {
          const isActive = Array.isArray(item.path) ? item.path.includes(pathname) : pathname === item.path;
          return (
            <div
              key={index}
              onClick={() => router.push(Array.isArray(item.path) ? item.path[0] : item.path)}
              className={`hover:opacity-80 rounded-lg flex items-center gap-1.5 px-2 py-1.5 cursor-pointer 
                ${isActive ? "border border-gray-200 bg-gray-100" : "opacity-70"} 
                ${(item.label === "Projects" || item.label === "Clients") ? "w-[110px] h-[44px]" : "w-[93px] h-[44px]"}`}
            >
              {item.icon}
              <span className={`text-[18px] mt-1 ${isActive && 'text-[#0E004B] '}`}>{item.label}</span>
            </div>
          );
        })}
      </div>
      {/* User Avatar */}
      <>
        {/* Avatar Button */}
        <div className="absolute gap-3  top-4 right-3 sm:right-10 md:right-14 lg:right-20 flex items-center space-x-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Tooltip title="Notification" arrow disableInteractive>
              <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Bell className="w-6 h-6 text-gray-700" />
                {/* <span className="absolute bottom-3 right-1 w-2 h-2 bg-green-500 rounded-full" /> */}
                {hasNotification && hasNotificationBlink && (
                  <>
                    <span className="absolute bottom-3 right-1 w-2 h-2 bg-green-500 rounded-full" />
                    <span className="absolute bottom-[10px]  w-3 h-3 right-4 bg-green-400 rounded-full animate-ping" />

                  </>

                  // <span className="absolute bottom-[10px]  w-3 h-3 right-4 bg-green-400 rounded-full animate-ping" />
                )}
              </div>
            </Tooltip>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-12 right-0 w-[300px] bg-white shadow-lg border border-gray-200 rounded-lg p-3 z-50">
                {/* Header with Clear Button */}
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-semibold text-gray-900"></h3>
                  <div className="relative group flex items-center">
                    <button
                      className="text-xs text-gray-500 hover:text-gray-700  w-4 h-4 flex justify-center items-center"
                      onClick={handleClearNotifications}
                    >
                      Clear
                    </button>
                    {/* Tooltip */}
                    <div className="absolute right-0 bottom-6 w-max px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Clear Notifications
                    </div>
                  </div>
                </div>


                {/* Notifications List */}
                {notificationListLoading?.loading ? (<TableSkeleton />) :
                  notificationListData?.length > 0 ? (
                    notificationListData?.map((notification, index) => (
                      <div key={notification.id} className="py-2">
                        <h3
                          className="text-sm font-semibold text-gray-900 hover:cursor-pointer"

                        >
                          {notification?.heading}
                        </h3>
                        <p className="text-gray-900 text-sm hover:cursor-pointer">{notification?.body}</p>
                        {index !== notificationListData.length - 1 && <hr className="my-2 border-gray-300" />}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 text-sm">No notifications available</p>
                  )}
              </div>
            )}



          </div>
          <button onClick={() => setIsOpen2(true)}>
            <UserAvatar name={userData?.name} size={36} isActive={isActive} />
          </button>
          <Tooltip title='Logout' arrow disableInteractive>
            <LogOutIcon className="cursor-pointer hover:text-red-600" onClick={handleLogout} />
          </Tooltip>
          {/* <LogOut
          isOpen2={isOpen2}
          user={user}
          setIsOpen2={setIsOpen2}
        /> */}

        </div>



      </>
      {/* Mobile Sidebar */}
      <div
        className={`fixed  top-0 left-0 w-[250px] h-full bg-white shadow-md transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl "
          onClick={() => setIsOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Sidebar Navigation */}
        <div className="mt-16  flex flex-col gap-4 px-4">
          {navItems.map((item) => {
            const isActive = Array.isArray(item.path) ? item.path.includes(pathname) : pathname === item.path;
            return (
              <div
                key={Array.isArray(item.path) ? item.path[0] : item.path}
                onClick={() => {
                  router.push(Array.isArray(item.path) ? item.path[0] : item.path);
                  setIsOpen(false); // Close menu on click
                }}
                className={`rounded-lg flex items-center gap-3 p-3 cursor-pointer 
                  ${isActive ? "bg-gray-200" : "opacity-70 hover:bg-gray-100"}`}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
