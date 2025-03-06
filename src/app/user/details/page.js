"use client";
import { OtherIcons } from "@/assests/icons";
import LayOut from "@/components/LayOut";
import React, { useEffect, useState } from "react";
import UserAvatar from "@/components/common/UserAvatar/UserAvatar";
import { useRouter } from "next/navigation";
import SkillsList from "@/components/common/SkillsList/SkillsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateUserStatus } from "@/app/store/userSlice";
import Swal from "sweetalert2";

const UserDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const itemId = new URLSearchParams(location.search).get("id");
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setItemId(params.get("id"));
    }
  }, []);
  const userDetailData = useSelector((state) => state?.user?.userDetails?.data);

  const [isActive, setIsActive] = useState(userDetailData?.status);

  const user = {
    name: `${userDetailData?.first_name || ""} ${
      userDetailData?.last_name || ""
    }`.trim(),

    isActive: true,
    image: "",
  };

  useEffect(() => {
    if (itemId) dispatch(fetchUserDetails(itemId));
  }, [dispatch, itemId]);

  useEffect(() => {
    // Ensure the state is synced with the API response on component mount/update
    setIsActive(userDetailData?.status);
  }, [userDetailData]);

  const handleToggleStatus = async (event) => {
    const newStatus = !isActive ? 1 : 0; // Toggle logic: Active (0) → Inactive (1), Inactive (1) → Active (0)

    const result = await Swal.fire({
      text: `Do you want to ${
        newStatus === 1 ? "Inactive" : "Active"
      } this User?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setIsActive(!isActive); // Update local state immediately

      // Dispatch updateUserStatus with the new status
      dispatch(updateUserStatus({ id: itemId, status: newStatus, router }));
    }
  };

  const skillsArray = userDetailData?.skill_set
    ?.split(", ")
    .map((skill) => skill.trim());

    const handleEditUser = () => {
      router.push(`/user/add?id=${itemId}&edit=true`);
    };
    
 
  return (
    <LayOut>
      <div className="w-full  h-full    left-[80px] rounded-[10.17px] border border-[#F4EAEA] bg-white p-6 shadow-lg">
        <div className="w-full  h-[40px] relative top-[6px] sm:flex items-center justify-between px-2 border-b border-gray-100 ">
          <p className="text-[26px] mb-[20px]">User Information</p>

          <div className="flex  items-center space-x-3 mb-[20px]">
            {/* Toggle Switch */}
            <label className="flex items-center cursor-pointer">
              <span className="ml-2 text-[15px] mr-2">
                {isActive ? "Inactive" : "Active"}
              </span>

              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isActive}
                  onChange={handleToggleStatus}
                />
                {/* Track */}
                <div className="w-16 h-[33px] rounded-full shadow-inner transition duration-300 ease-in-out bg-gray-100"></div>

                {/* Thumb */}
                <div
                  className={`absolute w-[30px] h-[25px] rounded-full shadow-md top-[4px] left-[2px] transition-transform duration-300 ease-in-out 
                ${isActive ? "translate-x-9 bg-red-400" : "bg-green-400"}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                    {isActive ? "✘" : "✔"}
                  </span>
                </div>
              </div>
            </label>

            {/* Edit Button */}
            <button
              onClick={handleEditUser}
              className="w-[80px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4 xl:gap-6  xl:flex-row items-start justify-between mt-16 sm:mt-0">
          {/* Avatar Section */}
          <div className=" w-[260px] h-[69px] flex items-center gap-[12.21px] ">
            <UserAvatar
              name={user.name}
              dotcolor="green"
              size={66}
              image={user.image}
              isActive={user.isActive}
            />
            <div className=" text-xl text-gray-700">
              <p className="font-medium flex w-full ">{`${
                userDetailData?.first_name || ""
              } ${userDetailData?.last_name || ""}`}</p>
              <p className="text-xs text-gray-500">
                {userDetailData?.designation || ""}
              </p>
            </div>
          </div>

          {/* User Information Section */}
          <div className="md:flex flex-row gap-8   ">
            <ul className="flex  flex-col space-y-2 ">
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Full Name:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">{`${
                  userDetailData?.first_name || ""
                } ${userDetailData?.last_name || ""}`}</span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">Email ID:</span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.email || ""}
                </span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Department:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.department || ""}
                </span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Date of Join:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.joining_date || ""}
                </span>
              </li>
              <li className="sm:w-[767px] sm:pt-[120px] sm:pb-10 sm:mt-[200px] t-2 sm:absolute  flex items-start">
                <span className="w-[114px] h-[24px] opacity-70">Skills:</span>
                <span className=" left-1  flex gap-2 items-center ml-[35px]">
                  <SkillsList skills={skillsArray} />
                </span>
              </li>
            </ul>

            <ul className="mt-14 md:mt-0 flex flex-col space-y-2">
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">Contact:</span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.phone_number || ""}
                </span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Employee ID:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.employee_id || ""}
                </span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Department:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.department || ""}
                </span>
              </li>
              <li className="w-[367px] h-[24px] flex items-center">
                <span className="w-[114px] h-[24px] opacity-70">
                  Designation:
                </span>
                <span className="w-[183px] h-[23px] ml-[35px]">
                  {userDetailData?.designation || ""}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ml-[33] mt-[40px]">
          {/* Projects Heading */}
          <div className="w-[112.39px] h-[34.39px] flex items-center gap-[6px]">
            {OtherIcons.projects_svg}
            <span className="text-lg font-medium">Projects</span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mt-4  ">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-[100%] h-[132px] border border-gray-300 rounded-[8.93px] p-4 shadow-md hover:shadow-lg transition-all"
              >
                <p className="text-[18px] leading-[24.3px] tracking-[-3%] text-gray-800">
                  HRMS Dashboard
                </p>

                <ul className="mt-2 space-y-2">
                  <li className="flex text-gray-700">
                    <span className="text-[10.72px] w-[60px]  text-gray-600">
                      End Date
                    </span>
                    <span className="text-[12px]">01 Jan, 2025</span>
                  </li>
                  <li className="flex text-gray-700  text-gray-600 ">
                    <span className="text-[10.72px] w-6">Team</span>
                    <span className="text-[12px] ml-9">
                      Akash Shinde, Aryan Singh, Puneet Omar, Prachi Jadhav
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <button className="mt-4 px-4 py-2 bg-white border border-gray-200 text-black rounded-md flex align-middle items-center mx-auto shadow-md hover:shadow-lg">
            View More
          </button>
        </div>
      </div>
    </LayOut>
  );
};

export default UserDetails;
