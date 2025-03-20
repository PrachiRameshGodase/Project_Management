"use client"
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import { OtherIcons } from '@/assests/icons';
import LayOut from '@/components/LayOut';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AddClient = () => {
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
    const userDetailData = useSelector(state => state?.user?.userDetails?.data?.user);
    const usersLoading = useSelector((state) => state.user);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_name: "",
        password: "",
        is_client: 1,
    });
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        name: false,
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
        let newErrors = {
            name: formData?.name ? false : true,
            email: formData?.email ? false : true,
            password: formData?.password ? false : true,
        }
        setErrors(newErrors);
        const hasAnyError = Object.values(newErrors).some(
            (value) => value === true
        );
        if (hasAnyError) {
            await Swal.fire({
                text: "Please fill all the required fields.",
                confirmButtonText: "OK",
            });
            return;
        } else {
            try {
                const sendData = {
                    ...formData,

                }
                dispatch(addUser({ userData: sendData, router, section: "client" }));
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };


    useEffect(() => {
        if (userDetailData && itemId) {
            setFormData({
                id: userDetailData?.id,
                email: userDetailData?.email,
                contact_name: userDetailData?.contact_name,
                password: userDetailData?.c_password,
                name: userDetailData?.name
            });
        }
    }, [userDetailData, itemId]);


    return (
        <LayOut> <div className="sm:flex mx-auto sm:mx-0  flex-col items-center justify-center">
            <div className="text-2xl tracking-tight sm:ml-[7px] text-[32px]  w-full">{!itemId ? "Add New Client": "Update Client"}</div>

            <div className="sm:flex   justify-between items-center h-screen mx-auto sm:-mt-16  xl:lg:-mt-18">
                <form className="sm:w-[690px] h-[656px] bg-white p-3 sm:p-8 rounded-lg space-y-8" onSubmit={handleSubmit}>
                    <div className="sm:flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <label className="block text-[20px]">
                            Client Name <span className='text-red-600'>*</span>
                        </label>
                        <div className="flex flex-col w-[310px] sm:w-[350px] md:w-[400px]">
                            <input
                                className="h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-400"
                                type="text"
                                name="name"
                                placeholder="Enter Client Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors?.name && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Please Enter Client Name</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="sm:flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <label className="block text-[20px]">
                            Email <span className='text-red-600'>*</span>
                        </label>
                        <div className="flex flex-col w-[310px] sm:w-[350px] md:w-[400px]">
                            <input
                                className="h-10 border border-[#0000004D] rounded-lg p-2 text-m placeholder:text-gray-400"
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors?.email && (
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Please Fill Email</span>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="sm:flex flex-col sm:flex-row justify-between items-start sm:items-center relative">
                        <label className="block text-[20px]">
                            Password <span className="text-red-600">*</span>
                        </label>
                        <div className="relative w-[310px] sm:w-[350px] md:w-[400px]">
                            <input
                                className="w-full h-10 border border-[#0000004D] rounded-lg p-2 pr-10 text-m placeholder:text-gray-400"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter Password"
                                value={formData?.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors?.password && ( // Ensure it's checking for password errors, not phone_number
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Please Fill Password</span>
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <div className="sm:flex justify-between items-center">
                        <label className="block text-m">Client ID <span className='text-red-600'>*</span></label>
                        <input
                            className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m placeholder:text-gray-400"
                            type="text"
                            name="employee_id"
                            placeholder="Enter Client ID"
                            value={formData.employee_id}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="sm:flex  justify-between items-center">
                        <label className="block text-[20px]">Contact Person Name</label>
                        <input className="w-[310px] sm:w-[400px]  h-10 border border-[#0000004D] rounded-lg p-2 text-m sm:ml-3 placeholder:text-gray-400" type='text' placeholder='Enter Name' value={formData.contact_name} name='contact_name'
                            onChange={handleChange} />
                    </div>

                    {/* <div className="sm:flex  justify-between items-center">
                        <label className="block text-m">Username</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-[60px] placeholder:text-gray-400" type='text' placeholder='Enter Username' />
                    </div> */}


                    {/* <div className="sm:flex  justify-between items-center">
                        <label className="block text-m ">Confirm Password</label>
                        <input className="w-[310px] sm:w-[350px]  h-10 border border-gray-300 rounded-lg p-2 text-m sm:ml-1 placeholder:text-gray-400" type='text' placeholder='Enter Confirm Password' />
                    </div> */}

                    <div className='sm:flex w-full justify-end'>
                        <button
                            type="submit"
                            className="w-[310px] sm:w-[350px] md:w-[400px] h-10 border border-[#0000004D] rounded-lg p-2 text-m bg-black text-gray-100 flex items-center justify-center"
                            disabled={usersLoading?.loading}
                        >
                            {usersLoading?.loading ? (
                                <div className="w-5 h-5 border-2 border-gray-100 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                               itemId? "Update": "Submit"
                            )}
                        </button>
                    </div>


                </form>
            </div>
        </div></LayOut>

    );
}

export default AddClient;
