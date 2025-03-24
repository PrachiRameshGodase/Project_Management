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
        project_id: null,
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
    // console.log("formData", formData)
    // console.log("itemId", itemId)
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
            setFormData(prev => ({ ...prev, project_id: Number(itemId2) }));
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
                dispatch(addProjectTask({ projectData: formData, router, itemId2, dispatch }));
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
            <div className="flex-col pb-5 justify-center items-center mx-auto sm:flex sm:mx-0">
                <div className="flex justify-content-between w-full">
                    <div className="text-[32px] text-2xl w-full ml-4 sm:ml-[7px] tracking-tight">{itemId ? "Update Task" : "Add New Task"}</div>
                    <div className="flex  justify-end absolute right-3 top-[90px]">
                        <button
                            onClick={handleClose}
                            className="text-gray-700 hover:text-black">
                            <CircleX size={30} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                <div className="h-screen justify-center items-center mx-auto sm:-mt-16 sm:flex xl:lg:-mt-[65px]">
                    <form className="bg-white h-[656px] p-8 rounded-lg w-full mb-4 sm:w-[650px] space-y-6" onSubmit={handleSubmit}>
                        <div className="flex-col justify-between sm:flex sm:flex-row">
                            <label className="text-[20px] block">Task Title <span className="text-red-600">*</span></label>
                            <div className="flex flex-col">
                                <input
                                    className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:ml-7 sm:w-[350px]"
                                    type='text'
                                    placeholder='Enter Task Title'
                                    value={formData?.task_title}
                                    onChange={handleChange}
                                    name='task_title'
                                    autoComplete='off'
                                />
                                {errors?.task_title && (
                                    <p className="flex text-red-500 text-sm items-center mt-1 sm:ml-7">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Enter Task Title</span>
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Task Type</label>
                            <Dropdown001
                                options={taskType}
                                selectedValue={formData?.task_type}
                                onSelect={(value) => handleDropdownChange("task_type", value)}
                                label="Select Task Type"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Due date</label>
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}
                                label="Select Priority"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Department</label>
                            <Dropdown001
                                options={departmentOptions}
                                selectedValue={formData?.department}
                                onSelect={(value) => handleDropdownChange("department", value)}
                                label="Select Department"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData?.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Link</label>
                            <input className="border border-gray-400 h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:ml-[78px] sm:w-[350px]" type='text' placeholder='Enter Link' value={formData?.link} name='link' onChange={handleChange} autoComplete='off'/>
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Visibility</label>
                            <Dropdown001
                                options={taskVisibility}
                                selectedValue={formData?.visibility}
                                onSelect={(value) => handleDropdownChange("visibility", value)}
                                label="Select Who Can See"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Attachments</label>
                            <FileUpload

                                onFilesChange={(files) => {

                                    setFormData((prev) => ({
                                        ...prev,
                                        attachment: files,
                                    }))
                                }

                                } initialFiles={formData.attachment} />

                        </div>
                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Description</label>
                            <textarea className="border border-gray-300 h-40 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:ml-[35px] sm:w-[350px]" type='text' placeholder='Enter Description' value={formData?.description} name='description' onChange={handleChange} autoComplete='off'/>
                        </div>

                        <div className='justify-end w-full sm:flex'>
                            <button
                                type="submit"
                                className="flex bg-black border border-[#0000004D] h-10 justify-center p-2 rounded-lg text-gray-100 text-m w-[310px] items-center md:w-[400px] sm:w-[350px]"
                                disabled={addTaskLoading?.loading}
                            >
                                {addTaskLoading?.loading ? (
                                    <div className="border-2 border-gray-100 border-t-transparent h-5 rounded-full w-5 animate-spin"></div>
                                ) : (
                                    itemId ? "Update" : "Submit"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </LayOut>
    )
}

export default AddTask
