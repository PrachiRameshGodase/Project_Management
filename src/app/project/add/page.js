"use client"
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02';
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker';
import { projectPriority } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import React, { useState } from 'react'

const AddProject = () => {
    const [selectedPriority, setSelectedPriority] = useState(false)
    const [selectedLeader, setSelectedLeader] = useState(false)
    const [selectedStage, setSelectedStage] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState(false)


    const [fileName, setFileName] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };
    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  mt-12 ml-[70px]">Add New Project</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5">
                        <div className="flex justify-between">
                            <label className="block text-m ">Project Name</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Project Name ' />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m">Starting date</label>
                            {/* <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='Date' placeholder='Enter Starting date' /> */}
                            <CustomDatePicker onChange={(date) => console.log("Selected Date:", date)} />
                        </div>

                        <div className='flex justify-between '>
                            <label className="block text-m">Due date</label>
                            {/* <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-14 placeholder:text-gray-700" type='Date' placeholder='Enter Due date' /> */}
                            <CustomDatePicker onChange={(date) => console.log("Selected Date:", date)} />

                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m mr-16">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedPriority}
                                onSelect={setSelectedPriority}
                                label="Select Priority"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m mr-4">Project Leader</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedLeader}
                                onSelect={setSelectedLeader}
                                label="Select Project Leader"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m mr-6">Project Stage</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedStage}
                                onSelect={setSelectedStage}
                                label="Select Stage"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-m mr-20">Team</label>
                            <Dropdown02
                                options={projectPriority}
                                selectedValue={selectedTeam}
                                onSelect={setSelectedTeam}
                                label="Select Stage"
                            />
                        </div>

                        <div className="flex justify-between">
                            <label className="block text-black text-sm font-medium">Attachments</label>
                            <label
                                className="w-[350px] h-10  text-[12px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                            >
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {fileName ? (
                                    <span className="text-gray-900">{fileName}</span>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                            <path d="M6.93745 10C6.24652 10.0051 5.83076 10.0263 5.4996 10.114C3.99238 10.5131 2.96048 11.8639 3.00111 13.3847C3.01288 13.8252 3.18057 14.3696 3.51595 15.4585C4.32309 18.079 5.67958 20.3539 8.7184 20.8997C9.27699 21 9.90556 21 11.1627 21L12.8372 21C14.0943 21 14.7229 21 15.2815 20.8997C18.3203 20.3539 19.6768 18.079 20.4839 15.4585C20.8193 14.3696 20.987 13.8252 20.9988 13.3847C21.0394 11.8639 20.0075 10.5131 18.5003 10.114C18.1691 10.0263 17.7534 10.0051 17.0625 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M12 3L12 14M12 3C12.4683 3 12.8243 3.4381 13.5364 4.3143L14.5 5.5M12 3C11.5316 3 11.1756 3.4381 10.4635 4.3143L9.49995 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span>Upload File</span>
                                    </div>
                                )}
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <label className="block text-m">Description</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-700" type='text' placeholder='Enter Description....' />
                        </div>

                        <div className=" flex justify-end">
                            <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[55px] bg-black text-gray-100 ">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </LayOut>
    );
}

export default AddProject
