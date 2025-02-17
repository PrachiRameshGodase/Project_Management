import LayOut from '@/components/LayOut';
import React from 'react'

const AddProject = () => {
    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  mt-12 ml-[70px]">Add New Project</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5">
                        <div className="flex">
                            <label className="block text-m ">Project Name</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter Project Name ' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Starting date</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='Date' placeholder='Enter Starting date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Due date</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-14" type='Date' placeholder='Enter Due date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Priority</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[65px]" type='text' placeholder='Enter Priority' />
                        </div>

                        <div className="flex">
                            <label className="block text-m ">Project Leader</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-4" type='text' placeholder='Select Project Leader' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Project Stage</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-6" type='text' placeholder='Select Project Stage' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Team</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[78px]" type='text' placeholder='Select Team' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Attachments</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5" type='text' placeholder='Select Joining Date' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Description</label>
                            <textarea className="w-[350px] h-40 border border-gray-300 rounded-lg p-2 text-m ml-[35px]" type='text' placeholder='Enter Description' />
                        </div>

                        <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[55px] bg-black text-gray-100 mr-2">Submit</button>
                    </form>
                </div>
            </div>
        </LayOut>
    );
}

export default AddProject
