"use client"
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { departmentOptions, designation } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import React, { useState } from 'react';

const AddUser = () => {
  const [selectedDepartment, setSelectedDepartment]=useState(false)
  const [selectedDesignation, setSelectedDesignation] = useState(false)
  return (
    <LayOut> <div className="flex">
      <div className="text-2xl tracking-tight  mt-12 ml-[70px]">Add User</div>

      <div className="flex justify-center items-center h-screen mx-auto">
        <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-5">
          <div className="flex">
            <label className="block text-m ">First Name</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter First Name ' />
          </div>

          <div className="flex">
            <label className="block text-m">Last Name</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter Last Name' />
          </div>

          <div className="flex">
            <label className="block text-m">Employee ID*</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-3" type='text' placeholder='Enter Employee ID' />
          </div>

          <div className="flex">
            <label className="block text-m">Email*</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[60px]" type='text' placeholder='Enter Email' />
          </div>

          <div className="flex">
            <label className="block text-m ">Phone Number</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1" type='text' placeholder='Enter Phone Number' />
          </div>

          <div className="flex">
            <label className="block text-m mr-6">Department</label>
            <Dropdown001
              options={departmentOptions}
              selectedValue={selectedDepartment}
              onSelect={setSelectedDepartment}
              label="Select Department"
            />
          </div>

          <div className="flex">
            <label className="block text-m mr-6">Designation</label>
            <Dropdown001
              options={designation}
              selectedValue={selectedDesignation}
              onSelect={setSelectedDesignation}
              label="Select Designation"
            />
          </div>

          <div className="flex">
            <label className="block text-m">Joining Date</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-5" type='Date' placeholder='Select Joining Date' />
          </div>

          <div className="flex">
            <label className="block text-m">Skill Set</label>
            <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[52px]" type='text' placeholder='Select Skill Set ' />
          </div>

          <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[110px] bg-black text-gray-100 mr-2">Submit</button>
        </form>
      </div>
    </div></LayOut>

  );
}

export default AddUser;
