"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OtherIcons } from "@/assests/icons";
import UserAvatar from "@/components/common/UserAvatar/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../store/dashboardSlice";
import useUserData from "@/components/common/Helper/useUserData";
import Loader from "@/components/common/Loader/Loader";

const HomePage = () => {
    const router = useRouter();
    const userData = useUserData()
    const dispatch = useDispatch()

    const dashboardList = useSelector((state) => state.dashboard?.list?.data);
    const dashboardLoading = useSelector((state) => state.dashboard);

  
    const isActive = userData?.status == 0 ? true : false

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    return (
        <> {dashboardLoading?.loading ? (<Loader />) : (<div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 sm:p-10 relative ">

            <div className="absolute top-4 right-5 sm:right-14 flex items-center space-x-2">
                <UserAvatar name={userData?.name} size={36} isActive={isActive} />

                <span className="cursor-pointer" onClick={() => router.push(`/`)} title="Go To Dashboard">
                    {OtherIcons.back_svg}
                </span>
            </div>

            <div className="flex flex-col w-full mt-[20px]  ">
                <h1 className="text-3xl text-[32px] font-semibold text-gray-800 sm:text-center ">All Projects</h1>

                {/* Projects Grid */}
                <div className="grid  grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto mt-[30px]">
                    {dashboardList?.projects?.recent_projects?.map((card) => {
                        const [toDo, inProgress, underReview, completed] = card.task || [0, 0, 0, 0];
                        // const taskSum = card.task.reduce((acc, num) => acc + num, 0); // 🔹 Har card ka apna total task sum

                        return (
                            <div
                                key={card.id}
                                className="w-full h-full bg-white shadow-sm hover:shadow-md rounded-[17.5px] p-4 text-center flex flex-col justify-between hover:cursor-pointer"
                                onClick={() => router.push(`/project/details?id=${card?.id}`)}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <p className="capitalize text-[18px] text-[#2A2A2A] text-left">{card?.project_name || ""}</p>

                                        <span
                                            className={`border rounded-[4px] ${card.status === "In Progress"
                                                ? "text-[#CA9700] border-[#CA9700]"
                                                : card.status === "Under Review"
                                                    ? "text-[#0D4FA7] border-[#0D4FA7]"
                                                    : card.status === "Completed"
                                                        ? "text-[#538d4b] border-[#538d4b]"
                                                        : ""
                                                } h-[24px] w-fit px-2 py-1 flex items-center text-[12px] text-[#202730] border-[#7a8ba0]`}
                                        >
                                            {card?.status || ""}
                                        </span>
                                    </div>

                                    {/* Date Section */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                            {OtherIcons.dateTime_svg}
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-gray-800 text-[14px]">{card?.due_date || ""}</p>
                                            <p className="text-[#320b5775] text-[12px]">Deadline Date</p>
                                        </div>
                                    </div>

                                    {/* Team Members */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                                            {OtherIcons.clients_svg}
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <p className="text-gray-800 text-[14px]">
                                                {card?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name)?.join(", ")}
                                            </p>
                                            <p className="text-[#320b5775] text-[12px]">Team</p>
                                        </div>
                                    </div>

                                    {/* Task Counts Table */}
                                    <div className="border border-gray-200 -mb-2 rounded-b-lg p-1 bg-[#EDF2FE99] mt-1 w-[106%] -ml-[9px]">
                                        <div className=" flex items-center gap-2 mb-2 justify-between">
                                            <div className="flex items-center flex-row gap-1">
                                                <div className="border bg-white border-gray-400 p-1 rounded-full">
                                                    {OtherIcons.task_svg}
                                                </div>
                                                <p className="font-normal text-[14px] leading-[17.28px]">
                                                    Tasks ({card?.tasks_count || 0})
                                                </p>
                                            </div>
                                        </div>

                                        <div className=" h-[48px] border rounded-sm p-1 border-gray-200 bg-white">
                                            <table className="  w-full">
                                                <thead>
                                                    <tr className="text-left ">
                                                        <td className="font-300 text-gray-400 text-[12px]">To Do</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">In Progress</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">Under Review</td>
                                                        <td className="font-300 text-gray-400 text-[12px]">Completed</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="">
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {card?.to_do_tasks_count || 0}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {card?.in_progress_tasks_count || 0}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {card?.under_review_tasks_count || 0}
                                                        </td>
                                                        <td className="font-300 text-gray-700 text-[14px] text-center">
                                                            {card?.completed_tasks_count || 0}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>)}</>

    );
};

export default HomePage;
