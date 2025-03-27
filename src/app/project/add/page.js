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
    const handleClose = () => {
        router.push("/project/list")
        localStorage.removeItem("itemId", itemId)
    }
    return (
        <LayOut>
            <div className="flex-col justify-center items-center mx-auto sm:flex sm:mx-0">
                <div className="flex justify-content-between w-full">
                    <div className="text-[32px] text-2xl w-full ml:20 sm:ml-[7px] tracking-tight">{itemId ? "Update Project" : "Add New Project"}</div>
                    <div className="flex justify-end absolute right-3 top-[90px]">
                        <button
                            onClick={handleClose}
                            className="text-gray-700 hover:text-black">
                            <CircleX size={30} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                <div className="h-screen justify-center items-center mx-auto sm:-mt-16 sm:flex xl:-mt-[50px]">
                    <form className="bg-white  h-[100%] rounded-lg w-full mb-4 sm:p-8 sm:w-[650px] space-y-6" onSubmit={handleSubmit}>
                        <div className="flex-col justify-between sm:flex sm:flex-row">
                            <label className="text-[20px] block">Project Name<span className='text-red-600'>*</span></label>
                            <div className="flex flex-col">
                                <input
                                    className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:ml-7 sm:w-[350px]"
                                    type='text'
                                    placeholder='Enter Project Name'
                                    value={formData?.project_name}
                                    onChange={handleChange}
                                    name='project_name'
                                    autoComplete='off'
                                />
                                {errors?.project_name && (
                                    <p className="flex text-red-500 text-sm items-center mt-2 sm:ml-7">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Enter Project Name</span>
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="flex-col justify-between sm:flex sm:flex-row">
                            <label className="text-[20px] block">Client Name <span className='text-red-600'>*</span></label>
                            <div className="flex flex-col">
                                <Dropdown003
                                    selectedValue={formData?.client_id}
                                    onSelect={(value) => handleDropdownChange("client_id", value)}
                                    label="Select Client"
                                    type="client"
                                />
                                {errors?.client_id && (
                                    <p className="flex text-red-500 text-sm items-center mt-2">
                                        {OtherIcons.error_svg} <span className="ml-1">Please Select Client Name</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Starting date</label>
                            {/* <input className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] ml-7 placeholder:text-gray-700 sm:w-[350px]" type='Date' placeholder='Enter Starting date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.start_date}
                                onChange={(date) => handleDropdownChange("start_date", date)} />
                        </div>

                        <div className='justify-between sm:flex'>
                            <label className="text-[20px] block">Due date</label>
                            {/* <input className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] ml-14 placeholder:text-gray-700 sm:w-[350px]" type='Date' placeholder='Enter Due date' /> */}
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />

                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block mr-16">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}

                                label="Select Priority"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block mr-4">Project Leader</label>
                            <Dropdown03
                                options={usersList}
                                selectedValue={formData?.project_leader}
                                onSelect={(value) => handleDropdownChange("project_leader", value)}
                                label="Select Project Leader"
                                type="project"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block mr-6">Project Stage</label>
                            <Dropdown001
                                options={projectStage}
                                selectedValue={formData?.project_stage}
                                onSelect={(value) => handleDropdownChange("project_stage", value)}
                                label="Select Stage"
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block mr-20">Team</label>
                            <Dropdown002
                                
                                selectedValue={formData?.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                                project_id=""
                            />
                        </div>

                        <div className="justify-between sm:flex">
                            <label className="text-[20px] text-black block font-medium">Attachments</label>
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
                        <div className="justify-between sm:flex">
                            <label className="text-[20px] block">Description</label>
                            <textarea className="border border-[#0000004D] h-40 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-600 sm:ml-[35px] sm:w-[350px]" type='text' placeholder='Enter Description....' value={formData?.description} onChange={handleChange} name='description' autoComplete='off'/>
                        </div>

                        <div className='justify-end w-full sm:flex '>
                            <button
                                type="submit"
                                className="flex bg-black border border-[#0000004D] h-10 justify-center p-2 rounded-lg text-gray-100 text-m w-[310px] items-center md:w-[400px] sm:w-[350px]"
                                disabled={projectLoading?.loading}
                            >
                                {projectLoading?.loading ? (
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
    );
}

export default AddProject
