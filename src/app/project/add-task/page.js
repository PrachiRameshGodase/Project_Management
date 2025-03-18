"use client"
import { addProjectTask, fetchProjectTaskDetails } from '@/app/store/projectSlice'
import { fetchUsers } from '@/app/store/userSlice'
import { OtherIcons } from '@/assests/icons'
import FileUpload from '@/components/common/Attachments/FileUpload'
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker'
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01'
import { Dropdown002, Dropdown02 } from '@/components/common/Dropdown/Dropdown02'
import { departmentOptions, projectPriority, taskType, taskVisibility } from '@/components/common/Helper/Helper'
import LayOut from '@/components/LayOut'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const AddTask = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.user?.employeeList?.data);
    const addTaskLoading = useSelector((state) => state.project);

    const [itemId2, setStoredValue] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedId = localStorage.getItem("itemId");
            if (storedId) {
                setStoredValue(storedId); // Update itemId2
            }
        }
    }, []);
   
   console.log("itemId2", itemId2)
    const [itemId, setItemId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
            setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
        }
    }, []);
    const taskDetailsData = useSelector((state) => state.project?.projectTaskDetails?.data);
    useEffect(() => {
        if (itemId) {
            dispatch(fetchProjectTaskDetails(itemId));
        }
    }, [dispatch, itemId]);

    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const sendData = { is_employee: 1, };
        dispatch(fetchUsers(sendData));
    }, [searchTrigger, dispatch,]);

    const [formData, setFormData] = useState({
        project_id: "",
        task_title: "",
        task_type: "",
        due_date: "",
        priority: "",
        department: "",
        team: "",
        link: "",
        visibility: "",
        description: "",
        attachment: [],
    })
    console.log("formData", formData)
    const [errors, setErrors] = useState({
        task_title: false,

    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    }
    const handleDropdownChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    useEffect(() => {
        if (itemId2) {
            setFormData(prev => ({ ...prev, project_id: itemId2 }));
        }
    }, [itemId2]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            task_title: formData?.task_title ? false : true,

        }
        setErrors(newErrors);
        const hasAnyError = Object.values(newErrors).some(
            (value) => value === true
        );
        if (hasAnyError) {
            await Swal.fire({
                text: "Please fill all the required fields.",
                confirmButtonText: "OK",
            });
            return;
        } else {
            try {
                dispatch(addProjectTask({ projectData: formData, router, itemId, itemId2 }));
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    const handleClose = () => {
        router.push(`/project/details?id=${itemId2}`)
        localStorage.removeItem("itemId", itemId2)
    }

    useEffect(() => {
        if (taskDetailsData && itemId) {
            setFormData({
                id: taskDetailsData?.id,
                project_id: taskDetailsData?.project_id,
                task_title: taskDetailsData?.task_title,
                task_type: taskDetailsData?.task_type,
                due_date: taskDetailsData?.due_date,
                priority: taskDetailsData?.priority,
                department: taskDetailsData?.department,
                link: taskDetailsData?.link,
                visibility: taskDetailsData?.visibility,
                description: taskDetailsData?.description,
                attachment: taskDetailsData?.attachments ? JSON.parse(taskDetailsData?.attachments) : [],
                team: taskDetailsData?.team?.map((item) => item?.id)
            });
        }
    }, [taskDetailsData, itemId]);

    return (
        <LayOut>
            <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
                <div className="text-2xl tracking-tight ml-4 sm:ml-[7px] text-[32px]  w-full ">{itemId ? "Update Task" : "Add New Task"}</div>

                <div className="sm:flex justify-center items-center h-screen mx-auto sm:-mt-16 xl:lg:-mt-18">
                    <form className="w-full sm:w-[650px] mb-4 h-[656px] bg-white p-8 rounded-lg space-y-6" onSubmit={handleSubmit}>
                        <div className="sm:flex flex-col sm:flex-row justify-between">
                            <label className="block text-[20px]">Task Title <span className="text-red-600">*</span></label>
                            <div className="flex flex-col">
                                <input
                                    className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-400"
                                    type='text'
                                    placeholder='Enter Task Title'
                                    value={formData?.task_title}
                                    onChange={handleChange}
                                    name='task_title'
                                />
                                {errors?.task_title && (
                                    <p className="text-red-500 text-sm flex items-center mt-1 sm:ml-7">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Enter Task Title</span>
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Task Type</label>
                            <Dropdown001
                                options={taskType}
                                selectedValue={formData?.task_type}
                                onSelect={(value) => handleDropdownChange("task_type", value)}
                                label="Select Task Type"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Due date</label>
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}
                                label="Select Priority"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Department</label>
                            <Dropdown001
                                options={departmentOptions}
                                selectedValue={formData?.department}
                                onSelect={(value) => handleDropdownChange("department", value)}
                                label="Select Department"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData?.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-[20px]">Link</label>
                            <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-gray-400 rounded-lg p-2 text-m ml-[78px] placeholder:text-gray-400" type='text' placeholder='Enter Link' value={formData?.link} name='link' onChange={handleChange} />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Visibility</label>
                            <Dropdown001
                                options={taskVisibility}
                                selectedValue={formData?.visibility}
                                onSelect={(value) => handleDropdownChange("visibility", value)}
                                label="Select Who Can See"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Attachments</label>
                            <FileUpload

                                onFilesChange={(files) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        attachment: files,
                                    }))
                                }

                                } initialFiles={formData.attachment} />

                        </div>
                        <div className="flex justify-between">
                            <label className="block text-[20px]">Description</label>
                            <textarea className="w-[310px] sm:w-[350px] md:w-[400px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-400" type='text' placeholder='Enter Description' value={formData?.description} name='description' onChange={handleChange} />
                        </div>

                        <div className='sm:flex w-full justify-end'>
                            <button
                                type="submit"
                                className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m bg-black text-gray-100 flex items-center justify-center"
                                disabled={addTaskLoading?.loading}
                            >
                                {addTaskLoading?.loading ? (
                                    <div className="w-5 h-5 border-2 border-gray-100 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    itemId ? "Update" : "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                {/* <div className=" flex justify-end ">
                    <button
                        onClick={handleClose}
                        className="text-gray-700 hover:text-black">
                        <CircleX size={30} strokeWidth={1.5} />
                    </button>
                </div> */}
            </div>
        </LayOut>
    )
}

export default AddTask
