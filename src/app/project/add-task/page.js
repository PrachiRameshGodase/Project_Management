"use client"
import FileUpload from '@/components/common/Attachments/FileUpload'
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01'
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02'
import { departmentOptions, projectPriority } from '@/components/common/Helper/Helper'
import LayOut from '@/components/LayOut'
import React, { useState } from 'react'

const AddTask = () => {
    const [selectedPriority, setSelectedPriority] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState(false)
    const [selectedVisibility, setSelectedVisibility] = useState(false)

    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  ml-[70px]">Add New Task</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5 mb-12">
                        <div className="flex justify-between">
                            <label className="block text-m ">Task Title*</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Task Title' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Task type</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Select Task type' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Due date</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-14 placeholder:text-gray-700" type='Date' placeholder='Enter Due date' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedPriority}
                                onSelect={setSelectedPriority}
                                label="Select Priority"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m ">Department</label>
                            <Dropdown001
                                options={departmentOptions}
                                selectedValue={selectedDepartment}
                                onSelect={setSelectedDepartment}
                                label="Select Department"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Team</label>
                            <Dropdown02
                                options={projectPriority}
                                selectedValue={selectedTeam}
                                onSelect={setSelectedTeam}
                                label="Select Team"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Link</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[78px] placeholder:text-gray-700" type='text' placeholder='Enter Link' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Visibility</label>
                            <Dropdown02
                                options={projectPriority}
                                selectedValue={selectedVisibility}
                                onSelect={setSelectedVisibility}
                                label="Select Who Can See"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Attachments</label>
                            {/* <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5" type='text' placeholder='Select Joining Date' /> */}
                            <FileUpload onFilesChange={(files) => console.log(files)} />

                        </div>
                        <div className="flex justify-between">
                            <label className="block text-m">Description..</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-700" type='text' placeholder='Enter Description' />
                        </div>

                        <div className="flex justify-end w-full ">
                            <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  bg-black text-gray-100 ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOut>
    )
}

export default AddTask
