"use client"
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02';
import { projectPriority } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import React, { useState } from 'react'

const AddProject = () => {
    const [selectedPriority, setSelectedPriority] = useState(false)
    const [selectedLeader, setSelectedLeader] = useState(false)
    const [selectedStage, setSelectedStage] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState(false)



    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  mt-12 ml-[70px]">Add New Project</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5">
                        <div className="flex">
                            <label className="block text-m ">Project Name</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Project Name ' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Starting date</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='Date' placeholder='Enter Starting date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Due date</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-14 placeholder:text-gray-700" type='Date' placeholder='Enter Due date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m mr-16">Priority</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedPriority}
                                onSelect={setSelectedPriority}
                                label="Select Priority"
                            />
                        </div>

                        <div className="flex">
                            <label className="block text-m mr-4">Project Leader</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedLeader}
                                onSelect={setSelectedLeader}
                                label="Select Project Leader"
                            />
                        </div>

                        <div className="flex">
                            <label className="block text-m mr-6">Project Stage</label>
                            <Dropdown001
                                options={projectPriority}
                                selectedValue={selectedStage}
                                onSelect={setSelectedStage}
                                label="Select Stage"
                            />
                        </div>

                        <div className="flex">
                            <label className="block text-m mr-20">Team</label>
                            <Dropdown02
                                options={projectPriority}
                                selectedValue={selectedTeam}
                                onSelect={setSelectedTeam}
                                label="Select Stage"
                            />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Attachments</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5 placeholder:text-gray-700" type='text' placeholder='Select Joining Date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Description</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px] placeholder:text-gray-700" type='text' placeholder='Enter Description....' />
                        </div>

                        <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[55px] bg-black text-gray-100 mr-2">Submit</button>
                    </form>
                </div>
            </div>
        </LayOut>
    );
}

export default AddProject
