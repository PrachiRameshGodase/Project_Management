"use client"
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown002 } from '@/components/common/Dropdown/Dropdown02';
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker';
import { projectPriority, projectStage } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import React, { useEffect, useState } from 'react'
import FileUpload from '@/components/common/Attachments/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/app/store/userSlice';
import { useRouter } from 'next/navigation';
import { Dropdown003, Dropdown03 } from '@/components/common/Dropdown/Dropdown03';
import { addProject, fetchProjectDetails } from '@/app/store/projectSlice';
import Swal from 'sweetalert2';
import { OtherIcons } from '@/assests/icons';
import { CircleX } from 'lucide-react';

const AddProject = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.user?.employeeList?.data);
    const projectDetailData = useSelector((state) => state?.project?.projectDetails?.data);
    const projectLoading = useSelector((state) => state.project);


    const [itemId, setItemId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
            setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
        }
    }, []);

    const [formData, setFormData] = useState({
        project_name: "",
        client_id: null,
        start_date: "",
        due_date: "",
        priority: "",
        project_leader: null,
        project_stage: "",
        team: [],
        attachments: [],
        description: "",

    });
    const [errors, setErrors] = useState({
        project_name: false,
        client_id: false,

    })
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const sendData = { is_employee: 1 };
        dispatch(fetchUsers(sendData));
    }, [searchTrigger, dispatch,]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: false,
        }));
    };

    const handleDropdownChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
        setErrors((prevData) => ({
            ...prevData,
            [field]: false,
        }));
    };
    useEffect(() => {
        if (itemId) {
            dispatch(fetchProjectDetails(itemId));
        }
    }, [dispatch, itemId]);
    useEffect(() => {
        if (itemId && projectDetailData) {

            setFormData({
                id: projectDetailData?.id,
                project_name: projectDetailData?.project_name,
                client_id: projectDetailData?.client_id,
                start_date: projectDetailData?.start_date,
                due_date: projectDetailData?.due_date,
                priority: projectDetailData?.priority,
                project_leader: projectDetailData?.project_leader?.id,
                project_stage: projectDetailData?.project_stage,
                team: (projectDetailData?.team_leaders.map((item) => item?.id)),
                attachments: projectDetailData?.attachments ? JSON.parse(projectDetailData?.attachments) : [],
                description: projectDetailData?.description
            })
        }
    }, [itemId, projectDetailData])
    console.log("formData", formData)
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {
            project_name: formData?.project_name ? false : true,
            client_id: formData?.client_id ? false : true,
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
                const updatedFormData = {
                    ...formData,
                    // team: JSON.stringify(formData?.team), // Convert array of IDs to JSON string
                };
                dispatch(addProject({ projectData: updatedFormData, router }));
            } catch (error) {
                console.error("Error updating project:", error);
            }
        }
    };
    const handleClose=()=>{
        router.push("/project/list")
        localStorage.removeItem("itemId", itemId)
    }
    return (
        <LayOut>
            <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center ">
                <div className="text-2xl tracking-tight ml:20  sm:ml-[7px] text-[32px] w-full">{itemId ? "Update Project" :"Add New Project"}</div>

                <div className="sm:flex justify-center items-center h-screen mx-auto sm:-mt-10 xl:-mt-[70px] ">
                    <form className="w-full sm:w-[650px] mb-4 h-[656px] bg-white sm:p-8 rounded-lg space-y-6" onSubmit={handleSubmit}>
                        <div className="sm:flex flex-col sm:flex-row justify-between">
                            <label className="block text-[20px]">Project Name<span className='text-red-600'>*</span></label>
                            <div className="flex flex-col">
                                <input
                                    className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-7 placeholder:text-gray-400"
                                    type='text'
                                    placeholder='Enter Project Name'
                                    value={formData?.project_name}
                                    onChange={handleChange}
                                    name='project_name'
                                />
                                {errors?.project_name && (
                                    <p className="text-red-500 text-sm flex items-center mt-2 sm:ml-7">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Enter Project Name</span>
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="sm:flex flex-col sm:flex-row justify-between">
                            <label className="block text-[20px]">Client Name <span className='text-red-600'>*</span></label>
                            <div className="flex flex-col">
                                <Dropdown003
                                    selectedValue={formData?.client_id}
                                    onSelect={(value) => handleDropdownChange("client_id", value)}
                                    label="Select Client"
                                    type="client"
                                />
                                {errors?.client_id && (
                                    <p className="text-red-500 text-sm flex items-center mt-2">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Select Client Name</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Starting date</label>
                            {/* <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='Date' placeholder='Enter Starting date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.start_date}
                                onChange={(date) => handleDropdownChange("start_date", date)} />
                        </div>

                        <div className='sm:flex justify-between '>
                            <label className="block text-[20px]">Due date</label>
                            {/* <input className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m ml-14 placeholder:text-gray-700" type='Date' placeholder='Enter Due date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />

                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-16">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}

                                label="Select Priority"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-4">Project Leader</label>
                            <Dropdown03
                                options={usersList}
                                selectedValue={formData?.project_leader}
                                onSelect={(value) => handleDropdownChange("project_leader", value)}
                                label="Select Project Leader"
                                type="project"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-6">Project Stage</label>
                            <Dropdown001
                                options={projectStage}
                                selectedValue={formData?.project_stage}
                                onSelect={(value) => handleDropdownChange("project_stage", value)}
                                label="Select Stage"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-[20px] mr-20">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="sm:flex justify-between">
                            <label className="block text-black text-[20px] font-medium">Attachments</label>
                            <FileUpload
                                onFilesChange={(files) => {
                                  
                                    setFormData((prev) => ({
                                        ...prev,
                                        attachments: files,

                                    }))
                                }

                                }
                                initialFiles={formData.attachments} />



                        </div>
                        <div className="sm:flex justify-between">
                            <label className="block text-[20px]">Description</label>
                            <textarea className="w-[310px] sm:w-[350px] md:w-[400px] h-40 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-[35px] placeholder:text-gray-600" type='text' placeholder='Enter Description....' value={formData?.description} onChange={handleChange} name='description' />
                        </div>

                        <div className='sm:flex w-full justify-end'>
                            <button
                                type="submit"
                                className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m bg-black text-gray-100 flex items-center justify-center"
                                disabled={projectLoading?.loading}
                            >
                                {projectLoading?.loading ? (
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
    );
}

export default AddProject
