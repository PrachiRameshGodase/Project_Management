"use client"
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker';
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02';
import { departmentOptions, designation, projectPriority } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import React, { useState } from 'react';

const AddUser = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(false)
  const [selectedDesignation, setSelectedDesignation] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState(false)

  return (
    <LayOut> <div className="sm:flex ">
      <div className="text-2xl tracking-tight bor  ml-[70px]">Add User</div>

      <div className="sm:flex    justify-between items-center h-screen mx-auto">
        <form className="sm:w-[600px]  h-[100%] bg-white p-2 sm:p-8 rounded-lg space-y-5">
          <div className="sm:flex   justify-between items-center">
            <label className="block text-m ">First Name <span className='text-red-600'>*</span></label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  placeholder:text-gray-700" type='text' placeholder='Enter First Name ' />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m">Last Name</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  placeholder:text-gray-700" type='text' placeholder='Enter Last Name' />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m">Employee ID <span className='text-red-600'>*</span></label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  placeholder:text-gray-700" type='text' placeholder='Enter Employee ID' />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m">Email <span className='text-red-600'>*</span></label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m  placeholder:text-gray-700" type='text' placeholder='Enter Email' />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m ">Phone Number</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1 placeholder:text-gray-700" type='text' placeholder='Enter Phone Number' />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m mr-6">Department</label>
            <Dropdown001
              options={departmentOptions}
              selectedValue={selectedDepartment}
              onSelect={setSelectedDepartment}
              label="Select Department"
            />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m mr-6">Designation</label>
            <Dropdown001
              options={designation}
              selectedValue={selectedDesignation}
              onSelect={setSelectedDesignation}
              label="Select Designation"
            />
          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m">Joining Date</label>
            {/* <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5 placeholder:text-gray-700" type='Date' placeholder='Select Joining Date' /> */}
            <CustomDatePicker onChange={(date) => console.log("Selected Date:", date)} />

          </div>

          <div className="sm:flex justify-between items-center">
            <label className="block text-m">Skill Set</label>
            <Dropdown02
              options={projectPriority}
              selectedValue={selectedSkill}
              onSelect={setSelectedSkill}
              label="Select Skill"
            />
          </div>
          <div className='sm:flex w-full justify-end'>
            <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m   bg-black text-gray-100 ">Submit</button>
          </div>
        </form>
      </div>
    </div></LayOut>

  );
}

export default AddUser;
