"use client"
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker';
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02';
import { departmentOptions, designation, projectPriority, Skills, status } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [itemId, setItemId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setItemId(params.get("id"));
      setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
    }
  }, []);
  const userDetailData = useSelector(state => state?.user?.userDetails?.data);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
    email: "",
    phone_number: "",
    department: "",
    designation: "",
    joining_date: "",
    skill_set: [],
    status: 1
  });

  

  useEffect(() => {
    if (itemId) {
      dispatch(fetchUserDetails(itemId));
    }
  }, [dispatch, itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDropdownChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({ userData: formData, router }));
  };

  
  useEffect(() => {
    if (userDetailData && itemId) {
      setFormData({
        id: userDetailData?.id,
        first_name: userDetailData?.first_name,
        last_name: userDetailData?.last_name,
        employee_id: userDetailData?.employee_id,
        email: userDetailData?.email,
        phone_number: userDetailData?.phone_number,
        department: userDetailData?.department || "",  // Ensure default value
        designation: userDetailData?.designation || "",
        joining_date: userDetailData?.joining_date || "", // Ensure default value
        skill_set: userDetailData?.skill_set || [],
        status: userDetailData?.status,
      });
    }
  }, [userDetailData, itemId]);


  return (
    <LayOut>
      <div className="sm:flex mx-auto sm:mx-0">
        <div className="text-2xl tracking-tight sm:ml-[70px]">Add User</div>

        <div className="sm:flex justify-between items-center h-screen mx-auto">
          <form className="sm:w-[600px] h-[100%] bg-white p-2 sm:p-8 rounded-lg space-y-5" onSubmit={handleSubmit}>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">First Name <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-700"
                type="text"
                name="first_name"
                placeholder="Enter First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Last Name</label>
              <input
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-700"
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Employee ID <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-700"
                type="text"
                name="employee_id"
                placeholder="Enter Employee ID"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Email <span className='text-red-600'>*</span></label>
              <input
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-700"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Phone Number</label>
              <input
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-700"
                type="text"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Department</label>
              <Dropdown001
                options={departmentOptions}
                selectedValue={formData.department}
                onSelect={(value) => handleDropdownChange("department", value)}
                label="Select Department"
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Designation</label>
              <Dropdown001
                options={designation}
                selectedValue={formData.designation}
                onSelect={(value) => handleDropdownChange("designation", value)}
                label="Select Designation"
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Joining Date</label>
              <CustomDatePicker
               selectedDate={formData.joining_date}
                onChange={(date) => handleDropdownChange("joining_date", date)}
              />
            </div>

            <div className="sm:flex justify-between items-center">
              <label className="block text-m">Skill Set</label>
              <Dropdown02
                options={Skills}
                selectedValues={Array.isArray(formData.skill_set) ? formData.skill_set : []}
                onSelect={(value) => handleDropdownChange("skill_set", value)}
                label="Select Skill"
              />
            </div>

            <div className='sm:flex w-full justify-end'>
              <button
                type="submit"
                className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m bg-black text-gray-100"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </LayOut>
  );
};

export default AddUser;
