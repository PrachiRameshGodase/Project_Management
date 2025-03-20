"use client"
import { addUser, fetchUserDetails } from '@/app/store/userSlice';
import { OtherIcons } from '@/assests/icons';
import LayOut from '@/components/LayOut';
import { CircleX, Eye, EyeOff } from 'lucide-react';
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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

        let newErrors = {
            name: formData?.name ? false : true,
            email: formData?.email ? false : true,
            password: !formData?.password || !passwordRegex.test(formData.password),

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

    const handleClose = () => {
        router.push(`/client/list`)
        localStorage.removeItem("itemId", itemId2)
    }


    return (
        <LayOut> <div className="flex-col justify-center items-center mx-auto sm:flex sm:mx-0">
            <div className="flex justify-content-between w-full">
                <div className="text-[32px] text-2xl w-full sm:ml-[7px] tracking-tight">{!itemId ? "Add New Client" : "Update Client"}</div>
                <div className="flex justify-end absolute right-3 top-[90px]">
                    <button
                        onClick={handleClose}
                        className="text-gray-700 hover:text-black">
                        <CircleX size={30} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
            <div className="h-screen justify-between items-center mx-auto sm:-mt-16 sm:flex xl:lg:-mt-[115px]">
                <form className="bg-white h-[656px] p-3 rounded-lg sm:p-8 sm:w-[690px] space-y-8" onSubmit={handleSubmit}>
                    <div className="flex-col justify-between items-start sm:flex sm:flex-row sm:items-center">
                        <label className="text-[20px] block">
                            Client Name <span className='text-red-600'>*</span>
                        </label>
                        <div className="flex flex-col w-[310px] md:w-[400px] sm:w-[350px]">
                            <input
                                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m placeholder:text-gray-400"
                                type="text"
                                name="name"
                                placeholder="Enter Client Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors?.name && (
                                <p className="flex text-red-500 text-sm items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Please Enter Client Name</span>
                                </p>
                            )}
                        </div>
                    </div>

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
                            {errors?.password && ( // Ensure it's checking for password errors, not phone_number
                                <p className="text-red-500 text-sm flex items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Password must be 6-10 characters long, containing at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &).</span>
                                </p>
                            )}
                        </div>
                    </div>
                    {/* <div className="justify-between items-center sm:flex">
                        <label className="text-m block">Client ID <span className='text-red-600'>*</span></label>
                        <input
                            className="border border-gray-300 h-10 p-2 rounded-lg text-m w-[310px] placeholder:text-gray-400 sm:w-[350px]"
                            type="text"
                            name="employee_id"
                            placeholder="Enter Client ID"
                            value={formData.employee_id}
                            onChange={handleChange}
                        />
                    </div> */}

                    <div className="justify-between items-center sm:flex">
                        <label className="text-[20px] block">Contact Person Name</label>
                        <input className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-[310px] placeholder:text-gray-400 sm:ml-3 sm:w-[400px]" type='text' placeholder='Enter Name' value={formData.contact_name} name='contact_name'
                            onChange={handleChange} />
                    </div>

                    {/* <div className="justify-between items-center sm:flex">
                        <label className="text-m block">Username</label>
                        <input className="border border-gray-300 h-10 p-2 rounded-lg text-m w-[310px] placeholder:text-gray-400 sm:ml-[60px] sm:w-[350px]" type='text' placeholder='Enter Username' />
                    </div> */}


                    {/* <div className="justify-between items-center sm:flex">
                        <label className="text-m block">Confirm Password</label>
                        <input className="border border-gray-300 h-10 p-2 rounded-lg text-m w-[310px] placeholder:text-gray-400 sm:ml-1 sm:w-[350px]" type='text' placeholder='Enter Confirm Password' />
                    </div> */}

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
        </div></LayOut>

    );
}

export default AddClient;
