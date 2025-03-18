"use client";
import { fetchUserDetails, updateUserStatus } from '@/app/store/userSlice';
import { OtherIcons } from '@/assests/icons';
import Loader from '@/components/common/Loader/Loader';
import UserAvatar from '@/components/common/UserAvatar/UserAvatar';
import LayOut from '@/components/LayOut';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const ClientDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [itemId, setItemId] = useState(null);
    const usersLoading = useSelector((state) => state.user);
    const userDetailData = useSelector((state) => state?.user?.userDetails?.data?.user);
    const userDetail = useSelector((state) => state?.user?.userDetails?.data?.projects);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
        }
    }, []);

    const [isActive, setIsActive] = useState(userDetailData?.status || "");

    const user = {
        name: `${userDetailData?.name || ""}`,
        isActive: isActive == "0" ? true : false,
        image: "",
    };

    useEffect(() => {
        if (itemId) dispatch(fetchUserDetails(Number(itemId)));
    }, [dispatch, itemId]);

    useEffect(() => {
        if (userDetailData?.status !== undefined) {
            setIsActive(userDetailData.status);
        }
    }, [userDetailData?.status]);

    const handleToggleStatus = async (event) => {
        const newStatus = !isActive ? 1 : 0; // Toggle logic: Active (0) → Inactive (1), Inactive (1) → Active (0)

        const result = await Swal.fire({
            text: `Do you want to ${newStatus === 1 ? "Inactive" : "Active"
                } this Client?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        });

        if (result.isConfirmed && itemId) {
            setIsActive(!isActive); // Update local state immediately

            // Dispatch updateUserStatus with the new status
            dispatch(updateUserStatus({ id: itemId, status: newStatus, router, section: "client" }));
        }
    };

    const [showAll, setShowAll] = useState(false);

    // Limit projects to 8 initially
    const visibleProjects = showAll ? userDetail : userDetail?.slice(0, 8);


    const handleEditUser = () => {
        router.push(`/client/add?id=${itemId}&edit=true`);
    };
    return (
        <>{usersLoading?.loading ? (<Loader />) : <LayOut>
            <div className="w-full  h-full  left-[80px] rounded-[10.17px] sm:border border-[#F4EAEA] bg-white p-6 sm:shadow-lg">
                <div className="w-full  h-[40px] relative top-[6px] sm:flex items-center justify-between px-2 border-b border-gray-100 ">
                    <p className="text-[26px] mb-[20px]">
                        Client Information
                    </p>

                    <div className="flex items-center space-x-3 mb-[20px]">
                        {/* Toggle Switch */}
                        <label className="flex items-center cursor-pointer">
                            <span className="ml-2 text-[15px] mr-2">
                                {isActive ? "Inactive" : "Active"}
                            </span>

                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    defaultChecked={isActive}
                                    onChange={handleToggleStatus}
                                />
                                {/* Track */}
                                <div
                                    className={`w-[70px] h-[40px] rounded-full shadow- transition duration-300 ease-in-out bg-[#ECE4FF]`}></div>
                                <div
                                    className={`absolute w-[33px] h-[33px] rounded-full shadow-md top-[4px] left-[4px] transition-transform duration-300 ease-in-out ${!isActive
                                        ? "translate-x-7 bg-[#048339]"
                                        : "bg-[#E23703]"
                                        }`}>
                                    {isActive == "0" && (
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                                            <Check size={16} />
                                        </span>
                                    )}
                                    {isActive == "1" && (
                                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                                            <X size={16} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </label>

                        {/* Edit Button */}

                        <button className="w-[90px] h-[33px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2" onClick={handleEditUser}>
                            Edit
                        </button>
                    </div>
                </div>
                <div className="p-4 mt-16 sm:mt-0 flex flex-col gap-4 xl:gap-6  xl:flex-row items-start justify-between ">
                    {/* Avatar Section */}
                    <div className="  sm:w-[260px] h-[69px] flex items-center gap-[12.21px] ">
                        <UserAvatar name={user.name} dotcolor='purple' size={66} image={user.image} isActive={user.isActive} />
                        <div className=" text-xl text-gray-700">
                            <p className="font-medium flex w-full ">{userDetailData?.name || ""}</p>
                            <p className="text-xs text-gray-500">{userDetailData?.email || ""}</p>
                        </div>
                    </div>

                    {/* User Information Section */}
                    <div className="md:flex  flex-row gap-4  ">
                        <ul className="flex flex-col space-y-2">
                            <li className=" w-fit sm:w-[367px] h-[24px] flex items-center mt-3 mb-3">
                                <span className=" h-[24px] opacity-90 text-[20px]">Contact Person</span>
                            </li>
                            {/* <li className="w-fit sm:w-[367px] h-[24px] flex items-center">
                                <span className="sm:w-[130px] h-[24px] opacity-50">Name:</span>
                                <span className="sm:w-[183px] h-[23px] ml-[35px]">{userDetailData?.name || ""}</span>
                            </li> */}
                            <li className="sm:w-[367px] h-[24px] flex items-center">
                                <span className="sm:w-[130px] h-[24px] opacity-50">Contact Person Name:</span>
                                <span className="sm:w-[183px] h-[23px] ml-[35px]">{userDetailData?.contact_name}</span>
                            </li>

                        </ul>

                        <ul className="flex  flex-col space-y-2">
                            <li className="sm:w-[367px] h-[24px] flex items-center mt-3 mb-3">

                            </li>
                            <li className="sm:w-[367px] h-[24px] flex items-center">
                                <span className="sm:w-[114px] h-[24px] opacity-70">Email:</span>
                                <span className="sm:w-[183px] h-[23px] ml-[35px]">{userDetailData?.email || ""}</span>
                            </li>
                            <li className="sm:w-[367px] h-[24px] flex items-center">
                                <span className="sm:w-[114px] h-[24px] opacity-70">Client ID:</span>
                                <span className="sm:w-[183px] h-[23px] ml-[35px]">{userDetailData?.client_id || ""}</span>
                            </  li>

                        </ul>
                    </div>
                </div>

                <div className="ml-[33] mt-[20px]">
                    {/* Projects Heading */}
                    <div className="w-full h-[34.39px] flex items-center gap-[6px]">
                        {OtherIcons.projects_svg}
                        <span className="text-lg font-medium">Client Projects</span>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mt-4  ">
                        {visibleProjects?.map((item, index) => (
                            <div
                                key={item?.id}
                                className="w-[100%] h-[132px] border border-gray-300 rounded-[8.93px] p-4 shadow-md hover:shadow-lg transition-all"
                            >
                                <div className='flex justify-between'>
                                    <p className="text-[18px] leading-[24.3px] tracking-[-3%] text-gray-800">
                                        {item?.project_name || ""}
                                    </p>
                                    <p
                                        className={`px-2  border rounded-md text-[13px] ${item?.priority === 'high'
                                            ? 'text-[#4976F4] border-[#4976F4]' : item?.priority === 'low' ?
                                                'text-red-400 border-red-400' : 'text-[#954BAF] border-[#954BAF] h-[20px] w-[70px]'
                                            } inline-block`}
                                    >
                                        {item?.priority ? item.priority.charAt(0).toUpperCase() + item.priority.slice(1) : ""}
                                    </p>
                                </div>


                                <ul className="mt-2 space-y-2">
                                    <li className="flex text-gray-700">
                                        <span className="text-[12px] w-[60px]  text-gray-600">
                                            End Date
                                        </span>
                                        <span className="text-[12px]">
                                            {item?.due_date || ""}
                                        </span>
                                    </li>
                                    <li className="flex text-gray-700 ">
                                        <span className="text-[12px]  text-gray-600 w-6">
                                            Team
                                        </span>
                                        <span className="text-[12px] ml-9">

                                            {item?.team_members?.map((item) => item?.name).join(", ") || ""}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    {userDetail?.length > 8 && !showAll && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="mt-4 px-4 py-2 bg-white border border-gray-200 text-black rounded-md flex align-middle items-center mx-auto shadow-md hover:shadow-lg"
                        >
                            View More
                        </button>
                    )}
                </div>
            </div></LayOut>}</>


    );
};

export default ClientDetails;
