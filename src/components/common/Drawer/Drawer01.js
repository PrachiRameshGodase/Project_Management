"use client";
import {
  updateProjectStatus,
  updateProjectTaskStatus,
  updateStatus,
  updateTaskStatus
} from "@/app/store/projectSlice";
import { motion } from "framer-motion";
import { Check, CircleX, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import AttachmentPreview from "../Attachments/AttachmentPreview";
import CommentBox from "../CommentBox/CommentBox";
import DropdownStatus01 from "../Dropdown/DropdownStatus01";
import { formatDate, statusProject } from "../Helper/Helper";
import useUserData from "../Helper/useUserData";

const Drawer01 = ({
  isOpen,
  setIsDrawerOpen,
  details,
  itemId,
  setSelectedStatus,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useUserData()
  const drawerRef = useRef(null);

  const documents = details?.attachments ? JSON.parse(details?.attachments) : []
  const [isActive, setIsActive] = useState(details?.project_status || "");
  const [isActive2, setIsActive2] = useState(details?.status || "");

  useEffect(() => {
    if (details?.project_status !== undefined) {
      setIsActive(details?.project_status);
    }
  }, [details]);
  useEffect(() => {
    if (details?.status !== undefined) {
      setIsActive2(details?.status);
    }
  }, [details]);



  const handleToggleStatus = async (event) => {
    const newStatus = !isActive ? 1 : 0; // Toggle logic: Active (0) → Inactive (1), Inactive (1) → Active (0)

    const result = await Swal.fire({
      text: `Do you want to ${newStatus === 1 ? "Active" : "Inactive"
        } this Project?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setIsActive(!isActive); // Update local state immediately

      // Dispatch updateUserStatus with the new status
      dispatch(updateStatus({ id: itemId, project_status: newStatus, router }));
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false); // Close drawer if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <motion.div
      ref={drawerRef}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-[320px] sm:w-[456px] bg-white shadow-lg z-50 drawer-scrollbar">
      <div className="p-2 flex justify-end items-center ">
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="text-gray-700 hover:text-black">
          <CircleX size={30} strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-1 sm:p-4 overflow-y-auto h-full">
        <div className="flex justify-between">
          <div className="w-full h-[69px] flex items-center justify-between ">
            <div className="text-xl text-gray-700 ">
              <span className="font-bold">{details?.project_name || "--"}</span>
              <p className="text-xs text-gray-500">
                {details?.client?.name || "--"}
              </p>
            </div>
            {/* <DropdownStatus01
              options={statusProject}
              selectedValue={details?.status}
              onSelect={(value) => handleStatusChange(value)}
              label="Status"
              className="w-[150px]"
            /> */}
            {details?.status ? (
              <span
                className={`px-3 py-1 border rounded-md inline-block text-[12px]
        ${details.status === "To Do"
                    ? "text-[#6C757D] border-[#6C757D]"
                    : details.status === "In progress"
                      ? "text-[#CA9700] border-[#CA9700]"
                      : details.status === "Completed"
                        ? "text-[#008053] border-[#008053]"
                        : "text-[#0D4FA7] border-[#0D4FA7]"
                  }`}
              >
                {details?.status}
              </span>
            ) : (
              "" // Placeholder for empty status
            )}
          </div>

        </div>
        <div className="flex justify-end">
          {/* <div className="flex items-center mr-2">
            <label className="flex items-center cursor-pointer">
              <span className="ml-2 text-[15px] mr-2">
                {!isActive ? "Inactive" : "Active"}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  defaultChecked={isActive}
                  onChange={userData?.is_client === 0 ? handleToggleStatus : undefined}
                />
                <div
                  className={`w-[70px] h-[40px] rounded-full shadow- transition duration-300 ease-in-out bg-[#ECE4FF]`}
                >

                </div>
                <div
                  className={`absolute w-[33px] h-[33px] rounded-full shadow-md top-[4px] left-[4px] transition-transform duration-300 ease-in-out ${isActive ? 'translate-x-7 bg-[#048339]' : 'bg-[#E23703]'
                    }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                      <Check size={16} />
                    </span>
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px]">
                      <X size={16} />
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div> */}
        </div>
        {/* Project Details Section */}
        <div className="p-1 sm:p-4 overflow-y-auto flex-grow drawer-scrollbar">
          {/* Project Details Section */}
          <div className="mb-4 mt-4 ml-[5px]">
            <p className="text-xl leading-6">Project Details </p>
            <ul className="mt-[20px]">
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Priority</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.priority || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Project Stage</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.project_stage}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Starting Date</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.start_date ? formatDate(details?.start_date) : "" || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Deadline</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.due_date ? formatDate(details?.due_date) : "" || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Project Leader</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.project_leader?.name || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Team</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(", ") || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Description</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.description || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Attachments</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px]">
                  <AttachmentPreview files={documents} />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comment Section - Fixed at Bottom */}
        <div className="p-4">
          <CommentBox projectId={Number(itemId)} taskId={null} />
        </div>
      </div>
    </motion.div>
  );
};

export default Drawer01;

export const Drawer001 = ({ isOpen, setIsDrawerOpen, itemId2, itemId, details }) => {

  const dispatch = useDispatch();
  const router = useRouter()
  const userData = useUserData()
  const drawerRef = useRef(null)
  const documents = details?.attachments ? JSON.parse(details?.attachments) : []
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isActive, setIsActive] = useState(details?.task_status || "");

  const [isActive2, setIsActive2] = useState(details?.status || "");

  useEffect(() => {
    if (details?.task_status !== undefined) {
      setIsActive(details?.task_status);
    }
  }, [details, setIsActive]);

  useEffect(() => {
    if (details?.status !== undefined) {
      setIsActive2(details?.status);
    }
  }, [details, setIsActive2]);

  const handleStatusChange = async (value) => {
    const result = await Swal.fire({
      text: `Do you want to update the status of this Task?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setSelectedStatus(value);

      // Dispatch updateUserStatus with the new status
      dispatch(updateTaskStatus({ id: itemId, status: value, dispatch, project_id: Number(itemId2) }));
    }
  };
  const handleToggleStatus = async (event) => {
    const newStatus = !isActive ? 1 : 0; // Toggle logic: Active (0) → Inactive (1), Inactive (1) → Active (0)

    const result = await Swal.fire({
      text: `Do you want to ${newStatus === 0 ? "Active" : "Inactive"
        } this Task?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed && itemId) {
      setIsActive(!isActive); // Update local state immediately

      // Dispatch updateUserStatus with the new status
      dispatch(
        updateProjectTaskStatus({ id: itemId, task_status: newStatus, dispatch, project_id: itemId2 })
      );
    }
  };


  const handleEditUser = () => {
    localStorage.setItem("itemId", itemId2)
    router.push(`/project/add-task?id=${itemId}&edit=true`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false); // Close drawer if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <motion.div
      ref={drawerRef}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-[320px] sm:w-[456px] bg-white shadow-lg z-50 drawer-scrollbar">
      <div className="p-2 flex justify-end items-center">
        {/* <button
          onClick={() => setIsDrawerOpen(false)}
          className="text-gray-800 hover:text-black">
          <CircleX size={25} />
        </button> */}
      </div>
      <div className="p-1 sm:p-4 overflow-y-auto h-full">
        <div className="flex justify-between">
          <div className="w-full flex items-center gap-[10px] ">
            <div className="text-xl text-gray-700">
              <span className="font-bold">{details?.task_title || ""}</span>
            </div>
          </div>

          <div>
            <span
              className={`px-3 py-1 border rounded-md  text-[12px] h-[25px] w-[110px] flex items-center align-middle text-center
        ${details?.status === "To Do"
                  ? "text-[#6C757D] border-[#6C757D]"
                  : details?.status === "In progress"
                    ? "text-[#CA9700] border-[#CA9700]"
                    : details?.status === "Completed"
                      ? "text-[#008053] border-[#008053]"
                      : "text-[#0D4FA7] border-[#0D4FA7]"
                }`}
            >
              {details?.status}
            </span>


          </div>
        </div>
        <div className="flex justify-between">
          
          <div className="flex items-center mr-2">
            <label className="flex items-center cursor-pointer">
              <span className="ml-2 text-[15px] mr-2">
                {isActive ? "Inactive" : "Active"}
              </span>

              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  defaultChecked={isActive}
                  onChange={userData?.is_client === 0 ? handleToggleStatus : undefined}
                />

                <div
                  className={`w-[70px] h-[40px] rounded-full shadow- transition duration-300 ease-in-out bg-[#ECE4FF]`}></div>
                <div
                  className={`absolute w-[33px] h-[33px] rounded-full shadow-md top-[4px] left-[4px] transition-transform duration-300 ease-in-out ${isActive == "0" ? "translate-x-7 bg-[#048339]" : "bg-[#E23703]"
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
          </div>
          <button className="w-[100px] h-[35px] rounded-[4px] py-[4px] bg-black text-white text-[16px] mb-2 p-4 mt-4" onClick={handleEditUser}>
            Edit
          </button>
        </div>
        {/* Project Details Section */}
        <div className="p-1 sm:p-4 overflow-y-auto flex-grow">
          {/* Project Details Section */}
          <div className="mb-4 mt-4 ml-[5px]">
            <p className="text-xl leading-6">Task Details </p>
            <ul className="mt-[20px]">
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]"> Due Date</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.due_date ? formatDate(details?.due_date) : "" || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Task Type</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.task_type || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Team</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.team_leaders?.map((item) => item?.first_name + " " + item?.last_name).join(", ") || ""}{" "}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Visibility</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.visibility || ""}
                </span>
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Link</span>
                <h4>:</h4>
                {details?.link ? (
                  <a
                    href={details?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 w-[200px] text-[14px] underline cursor-pointer"
                  >
                    {details?.link}
                  </a>
                ) : (
                  <span className="text-gray-700 w-[200px] text-[14px]"></span>
                )}
              </li>
              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Description</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px] text-[14px]">
                  {details?.description || ""}
                </span>
              </li>

              <li className="flex mb-2 gap-4">
                <span className="text-gray-400 w-[120px] text-[14px]">Attachments</span>
                <h4>:</h4>
                <span className="text-gray-700 w-[200px]">
                  <AttachmentPreview files={documents} />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comment Section - Fixed at Bottom */}
        <div className="p-4">
          <CommentBox projectId={Number(itemId2)} taskId={itemId} />
        </div>
      </div>
    </motion.div>
  );
};
