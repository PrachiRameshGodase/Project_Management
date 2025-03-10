"use client"
import { addProjectTask } from '@/app/store/projectSlice'
import { fetchUsers } from '@/app/store/userSlice'
import FileUpload from '@/components/common/Attachments/FileUpload'
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker'
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01'
import { Dropdown002, Dropdown02 } from '@/components/common/Dropdown/Dropdown02'
import { departmentOptions, projectPriority, taskType, taskVisibility } from '@/components/common/Helper/Helper'
import LayOut from '@/components/LayOut'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AddTask = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const usersList = useSelector((state) => state.user?.list?.data);


    const [itemId, setItemId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setItemId(params.get("id"));
           
        }
    }, []);
    const [searchTrigger, setSearchTrigger] = useState(0);

    useEffect(() => {
        const sendData = {};
        dispatch(fetchUsers(sendData));
    }, [searchTrigger, dispatch,]);
console.log("itemId", itemId)
    const [formData, setFormData] = useState({
        project_id: "",
        task_title: "",
        task_type: "",
        due_date: "",
        priority: "",
        department: "",
        team: [],
        link: "",
        visibility: "",
        description: ""
    })
console.log("formData", formData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleDropdownChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    useEffect(() => {
        if (itemId) {
            setFormData(prev => ({ ...prev, project_id: itemId }));
        }
    }, [itemId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProjectTask({ projectData: formData, router ,itemId}));
    };

    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  ml-[70px]">Add New Task</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5 mb-12">
                        <div className="flex justify-between">
                            <label className="block text-m ">Task Title*</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Task Title' value={formData?.task_title} onChange={handleChange} name='task_title' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Task Type</label>
                            <Dropdown001
                                options={taskType}
                                selectedValue={formData?.task_type}
                                onSelect={(value) => handleDropdownChange("task_type", value)}

                                label="Select Task Type"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Due date</label>
                            <CustomDatePicker
                                selectedDate={formData?.due_date}
                                onChange={(date) => handleDropdownChange("due_date", date)} />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={formData?.priority}
                                onSelect={(value) => handleDropdownChange("priority", value)}
                                label="Select Priority"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m ">Department</label>
                            <Dropdown001
                                options={departmentOptions}
                                selectedValue={formData?.department}
                                onSelect={(value) => handleDropdownChange("department", value)}
                                label="Select Department"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Team</label>
                            <Dropdown002
                                options={usersList}
                                selectedValue={formData?.team}
                                onSelect={(value) => handleDropdownChange("team", value)}
                                label="Select Team"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Link</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[78px] placeholder:text-gray-700" type='text' placeholder='Enter Link' value={formData?.link} name='link' onChange={handleChange}/>
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Visibility</label>
                            <Dropdown001
                                options={taskVisibility}
                                selectedValue={formData?.visibility}
                                onSelect={(value) => handleDropdownChange("visibility", value)}
                                label="Select Who Can See"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Attachments</label>
                            <FileUpload

                                onFilesChange={(files) => {
                                    const fileNames = files.map((file) => file.name);
                                    setFormData((prev) => ({
                                        ...prev,
                                        attachments: fileNames,
                                    }))
                                }

                                } initialFiles={formData.attachments} />

                        </div>
                        <div className="flex justify-between">
                            <label className="block text-m">Description..</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-700" type='text' placeholder='Enter Description' value={formData?.description} name='description' onChange={handleChange}/>
                        </div>

                        <div className="flex justify-end w-full ">
                            <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  bg-black text-gray-100 " onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOut>
    )
}

export default AddTask
