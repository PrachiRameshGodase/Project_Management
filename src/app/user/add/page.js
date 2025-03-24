"use client"
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import { OtherIcons } from '@/assests/icons';
import CustomDatePicker from '@/components/common/DatePicker/CustomDatePicker';
import { Dropdown001 } from '@/components/common/Dropdown/Dropdown01';
import { Dropdown02 } from '@/components/common/Dropdown/Dropdown02';
import { departmentOptions, designation, Skills } from '@/components/common/Helper/Helper';
import LayOut from '@/components/LayOut';
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Tooltip } from '@mui/material';


const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [itemId, setItemId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setItemId(params.get("id"));
      setIsEditMode(params.get("edit") === "true"); // Convert string to boolean
    }
  }, []);
  const userDetailData = useSelector(state => state?.user?.userDetails?.data?.user);
  const usersLoading = useSelector((state) => state.user);


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    department: "",
    designation: "",
    joining_date: "",
    skill_set: [],
    status: 1,
    is_employee: 1,
  });

  const [errors, setErrors] = useState({
    first_name: false,
    email: false,
    password: false
  })


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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/;

    let newErrors = {
      first_name: formData?.first_name ? false : true,
      email: formData?.email ? false : true,
      password: formData?.password ? false : true,
    };
    setErrors(newErrors);
    const hasAnyError = Object.values(newErrors).some(
      (value) => value === true
    );
    if (hasAnyError) {
      // await Swal.fire({
      //   text: "Please fill all the required fields.",
      //   confirmButtonText: "OK",
      // });
      return;
    } else {
      try {
        const sendData = {
          ...formData,
          name: formData?.first_name + (formData?.last_name ? " " + formData?.last_name : "")

        }
        dispatch(addUser({ userData: sendData, router }));
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };


  useEffect(() => {
    if (userDetailData && itemId) {
      setFormData({
        id: userDetailData?.id,
        first_name: userDetailData?.first_name,
        last_name: userDetailData?.last_name,
        password: userDetailData?.c_password,
        email: userDetailData?.email,
        phone_number: userDetailData?.phone_number,
        department: userDetailData?.department || "",  // Ensure default value
        designation: userDetailData?.designation || "",
        joining_date: userDetailData?.joining_date || "", // Ensure default value
        skill_set: userDetailData?.skill_set || [],
      });
    }
  }, [userDetailData, itemId]);
  const handleClose = () => {
    router.push(`/user/list`)
    localStorage.removeItem("itemId", itemId2)
  }

  return (
    <LayOut>
      <div className="flex-col justify-center items-center mx-auto sm:flex sm:mx-0">
        <div className="flex justify-content-between w-full">
          <div className="text-[32px] text-2xl w-full sm:ml-[7px] tracking-tight">{itemId ? "Update User" : "Add New User"}</div>
          <div className="flex justify-end absolute right-3 top-[90px]">
            <button
              onClick={handleClose}
              className="text-gray-700 hover:text-black">
              <CircleX size={30} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="h-screen justify-between items-center mx-auto sm:flex xl:lg:-mt-16">
          <form className="bg-white h-[100%] p-2 rounded-lg sm:p-8 sm:w-[650px] space-y-6" onSubmit={handleSubmit}>

            <div className="flex-col justify-between items-start sm:flex sm:flex-row sm:items-center">
              <label className="text-[20px] block">
                First Name <span className='text-red-600'>*</span>
              </label>
              <div className="flex flex-col w-[310px] md:w-[400px] sm:w-[350px]">
                <input
                  className="border border-[#0000004D] h-10 p-2 rounded-lg text-m placeholder:text-gray-400"
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors?.first_name && (
                  <p className="flex text-red-500 text-sm items-center mt-2">
                    {OtherIcons.error_svg} <span className="ml-1">Please Enter First Name</span>
                  </p>
                )}
              </div>
            </div>


            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Last Name</label>
              <input
                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:w-[350px]"
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                value={formData.last_name}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>

            {/* <div className="justify-between items-center sm:flex">
              <label className="text-m block">User ID <span className='text-red-600'>*</span></label>
              <input
                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-600 sm:w-[350px]"
                type="text"
                name="employee_id"
                placeholder="Enter User ID"
                value={formData.employee_id}
                onChange={handleChange}
              />
            </div> */}

            <div className="flex-col justify-between items-start sm:flex sm:flex-row sm:items-center">
              <label className="text-[20px] block">
                Email <span className='text-red-600'>*</span>
              </label>
              <div className="flex flex-col w-[310px] md:w-[400px] sm:w-[350px]">
                <input
                  className="border border-[#0000004D] h-10 p-2 rounded-lg text-m placeholder:text-gray-400"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors?.email && (
                  <p className="flex text-red-500 text-sm items-center mt-2">
                    {OtherIcons.error_svg} <span className="ml-1">Please Fill Email</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex-col justify-between items-start relative sm:flex sm:flex-row sm:items-center">
              <label className="text-[20px] block">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="w-[310px] md:w-[400px] relative sm:w-[350px]">
                <input
                  className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-full placeholder:text-gray-400 pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData?.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="text-gray-600 absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors?.password && (
                  <Tooltip
                    title="Password must be 8 characters long, containing at least one uppercase letter, one lowercase letter, one number."
                    arrow
                  >
                    <p className="text-red-500 text-sm flex items-center mt-2 cursor-pointer">
                      {OtherIcons.error_svg}
                      <span className="ml-1">
                        Password must be 8 characters long, containing...
                      </span>
                    </p>
                  </Tooltip>
                )}
              </div>
            </div>

            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Phone Number</label>
              <input
                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:w-[350px]"
                type="text"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                autoComplete='off'
              />
            </div>

            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Department</label>
              <Dropdown001
                options={departmentOptions}
                selectedValue={formData.department}
                onSelect={(value) => handleDropdownChange("department", value)}
                label="Select Department"
              />
            </div>

            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Designation</label>
              <Dropdown001
                options={designation}
                selectedValue={formData.designation}
                onSelect={(value) => handleDropdownChange("designation", value)}
                label="Select Designation"
              />
            </div>

            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Joining Date</label>
              <CustomDatePicker
                selectedDate={formData.joining_date}
                onChange={(date) => handleDropdownChange("joining_date", date)}
              />
            </div>

            <div className="justify-between items-center sm:flex">
              <label className="text-[20px] block">Skill Set</label>
              <Dropdown02
                options={Skills}
                selectedValues={Array.isArray(formData.skill_set) ? formData.skill_set : []}
                onSelect={(value) => handleDropdownChange("skill_set", value)}
                label="Select Skill"
              />
            </div>

            <div className='justify-end w-full sm:flex'>
              <button
                type="submit"
                className="flex bg-black border border-[#0000004D] h-10 justify-center p-2 rounded-lg text-gray-100 text-m w-[310px] items-center md:w-[400px] sm:w-[350px]"
                disabled={usersLoading?.loading}
              >
                {usersLoading?.loading ? (
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
};

export default AddUser;
