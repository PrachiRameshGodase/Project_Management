import LayOut from '@/components/LayOut'
import React from 'react'

const AddTask = () => {
    return (
        <LayOut>
            <div className="flex text-center">
                <div className="text-2xl tracking-tight  mt-12 ml-[70px]">Add New Task</div>

                <div className="flex justify-center items-center h-screen mx-auto">
                    <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5">
                        <div className="flex">
                            <label className="block text-m ">Task Title*</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter Task Title' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Task type</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Select Task type' />
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
                            <label className="block text-m ">Department</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-4" type='text' placeholder='Select Department' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Team</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-6" type='text' placeholder='Select Team' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Link</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[78px]" type='text' placeholder='Enter Link' />
                        </div>

                        <div className="flex">
                            <label className="block text-m">Visibility</label>
                            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5" type='text' placeholder='Select Visibility' />
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
    )
}

export default AddTask
