"use client";
import { fetchMaster, masterDelete } from "@/app/store/masterSlice";
import { OtherIcons } from "@/assests/icons";
import DataNotFound from "@/components/common/DataNotFound/DataNotFound";
import useUserData from "@/components/common/Helper/useUserData";
import Loader, { ScreenFreezeLoader } from "@/components/common/Loader/Loader";
import { OutsideClick } from "@/components/common/OutsideClick/OutsideClick";
import TableSkeleton from "@/components/common/TableSkeleton/TableSkeleton";
import TruncatedTooltipText from "@/components/common/TruncatedTooltipText/TruncatedTooltipText";
import LayOut from "@/components/LayOut";
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MasterDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userData = useUserData()
    const [itemId, setItemId] = useState(null);
    const drawerIsOpen = OutsideClick()

    const masterLoading = useSelector((state) => state.master);
    const masterDetailData = useSelector((state) => state.master?.list || []).filter((val) => val.id == Number(itemId));
    const masterType = masterDetailData?.map((item) => item?.labelid)
    const masterListData = useSelector((state) => state.master?.list || []).filter((val) => val.type == masterType)
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
        }
    }, []);

    const [dataLoading, setDataLoading] = useState(true)
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        if (itemId) {
           
            dispatch(fetchMaster());
        }

    }, [itemId, dispatch,]);

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleClose = () => {
        router.push(`/project/list`)
        // localStorage.removeItem("itemId", itemId2)
    }

    const handleEdit=(id)=>{
        router.push(`/master/add?id=${id}&edit=true`)

    }
    const handleDelete=(id)=>{
        dispatch(masterDelete({id, dispatch, section:"master", router, setDataLoading}))
    }

    const handleDeleteMainMaster=(id)=>{
        dispatch(masterDelete({id, dispatch, section:"main-master", router}))
    }

    const handleEditMainMaster =(id)=>{
        router.push(`/master/add?id=${id}&edit=true`)
    }
    return (
        <>
            {masterLoading?.loading && !dataLoading && <ScreenFreezeLoader />}
            {(masterLoading?.loading && dataLoading) ? (
                <Loader />

            ) : (
                <LayOut>
                    <div className="flex justify-end absolute right-3 top-[90px]">
                        <button
                            onClick={handleClose}
                            className="text-gray-700 hover:text-black">
                            <CircleX size={30} strokeWidth={1.5} />
                        </button>
                    </div>
                    <div className="w-full  h-full mx-auto px-1  sm:px-4  ml-[5px] sm:border border-gray-100 rounded-[10px]  ">
                        <div className=" min-[1250px]:flex   justify-between mt-[10px] sm:p-4 w-full">
                            {/* Avatar Section */}
                            <div className="  sm:w-full h-[69px] flex items-center gap-[12.21px] ">

                                <div className=" text-gray-900">
                                    <p className="text-[14px] sm:text-[18px]">
                                     Master Name  : {masterDetailData?.map((item) => item?.label) || ""}

                                    </p>

                                </div>


                            </div>
                            <div className="flex max-[850px]:flex-col justify-between gap-5 md:gap-10 lg:gap-4 max-[1250px]:mt-4">


                                <div className="sm:flex items-center gap-2">

                                    <button
                                        className="w-[80px] mt-3 sm:mt-0 h-[35px] text-[10px] rounded-[4px] py-[4px] border border-red-600   text-lg mr-[10px] mb-2 hover:bg-red-700 bg-red-600 hover:text-white text-gray-100"
                                        onClick={() => handleDeleteMainMaster(masterDetailData[0]?.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>  handleEditMainMaster(masterDetailData[0]?.id)}
                                        className="w-[80px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-lg mr-[10px] mb-2">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[44px] mt-6  flex justify-between items-center px-2 sm:px-4  ">
                            {/* Left Section (Heading + Count) */}
                            <div className="flex">
                                <p className="text-[20px] sm:text-[30px] leading-[32px] tracking-[-1.5px] text-gray-800">
                                    All Masters List
                                </p>

                                <p
                                    className={`${masterLoading?.loading && "rotate_01"
                                        } mt-[6px] hover:cursor-pointer`}
                                    data-tooltip-content="Reload"
                                    data-tooltip-place="bottom"
                                    data-tooltip-id="my-tooltip"
                                    onClick={() => setSearchTrigger((prev) => prev + 1)}>
                                    {OtherIcons?.refresh_svg}
                                </p>
                            </div>

                            {/* Right Section (Filters & Search) */}
                            <div className="hidden min-[950px]:flex gap-6 items-center">




                                {/* <Dropdown01 options={projectSortConstant} selectedValue={selectedSort} onSelect={setSelectedSort} label="Sort By" icon={OtherIcons.sort_by_svg} /> */}

                                <div className="w-[1px] h-[40px] bg-gray-400 opacity-40" />
                                {/* <Tooltip title="Add Task" arrow disableInteractive>
                                    <button
                                        className="w-[49px] h-[44px] bg-[#048339] text-white rounded-lg flex items-center justify-center text-2xl"
                                        onClick={
                                            handleAddTask
                                        }>
                                        +
                                    </button>
                                </Tooltip> */}
                            </div>

                            {/* Mobile Filter Button */}


                            {/* Mobile Filter Panel */}
                            <div
                                className={`fixed mt-20 top-0 right-0 w-[250px] h-full bg-white shadow-lg transform 
          ${isFilterOpen ? "translate-x-0" : "translate-x-full"
                                    } transition-transform duration-300 ease-in-out md:hidden`}>
                                {/* Close Button */}
                                <button
                                    className="absolute top-4 right-4 text-2xl"
                                    onClick={() => setIsFilterOpen(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        color="#000000"
                                        fill="none">
                                        <path
                                            d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {/* Filter Options */}

                            </div>
                        </div>

                        {/* w */}
                        {/* Table Section */}

                        <div className="max-w-full  overflow-x-auto mt-6 h-[calc(100vh+20px)] overflow-y-auto">
                            {(masterLoading?.taskListLoading && dataLoading) ? (
                                <TableSkeleton rows={7} columns={5} />

                            ) : (
                                <table className="w-full border-spacing-y-1 min-w-[1000px] border-2 border-transparent ">
                                    <thead>
                                        <tr className="m-1 rounded-md shadow-tr-border text-gray-600 text-left text-sm uppercase">
                                            <th className="flex text-[13px] min-w-[180px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px]  text-center mt-[10px]">
                                                <div className='flex w-full justify-between items-center text-gray-700'>
                                                    <span className='text-gray-700'>Label</span>
                                                </div>
                                            </th>
                                            <th className="text-[13px] min-w-[140px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">Label Id</th>
                                            <th className="text-[13px] min-w-[150px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">Value</th>
                                            <th className="text-[13px] min-w-[100px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700">Comment</th>
                                            <th className="text-[13px] min-w-[180px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[16px] text-gray-700 flex justify-center">Actions</th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {masterListData?.length > 0 ? (masterListData?.map((item, index) => (
                                            <tr key={item?.id} className="rounded-md cursor-pointer duration-200 hover:bg-gray-100 hover:shadow-tr-border transition-all">
                                                <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" onClick={() => router.push(`/master/details?id=${item?.id}`)}>
                                                    {item?.label || ""}

                                                </td>
                                                <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700" >

                                                    {item?.labelid || ""}
                                                </td>
                                                <td className="rounded text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[14px] text-gray-700">
                                                    {item?.value || ""}


                                                </td>

                                                <td className="text-[12px] px-2 py-2 sm:px-4 sm:py-3 sm:text-[15px] text-gray-700">
                                                    <TruncatedTooltipText text={item?.note || ""} maxLength={35} />

                                                </td>
                                                <td className="py-2 sm:py-3 px-2 sm:px-4 text-[12px] sm:text-[15px] text-gray-700 flex justify-center space-x-2">
                                                    {/* Add Button */}


                                                    {/* Edit Button */}
                                                    <button
                                                        className="flex bg-blue-500 h-[30px] justify-center rounded-lg text-white w-[35px] items-center"
                                                        onClick={() => handleEdit(item?.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-4.036a2.5 2.5 0 113.536 3.536l-10 10a2 2 0 01-1.414.586H6v-4a2 2 0 01.586-1.414l10-10z" />
                                                        </svg>
                                                    </button>

                                                    {/* Delete Button */}
                                                    <button
                                                        className="flex bg-red-500 h-[30px] justify-center rounded-lg text-white w-[35px] items-center"
                                                        onClick={() => handleDelete(item?.id)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </td>

                                            </tr>
                                        ))) : (<tr>
                                            <td colSpan="8" className="text-center py-8">
                                                <div className="flex justify-center items-center">
                                                    <DataNotFound />
                                                </div>
                                            </td>
                                        </tr>)
                                        }
                                    </tbody>
                                </table>
                            )}
                        </div>



                    </div>

                </LayOut>
            )}
        </>
    );
};

export default MasterDetails;
