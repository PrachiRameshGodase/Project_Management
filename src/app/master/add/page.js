"use client"
import { addMaster, fetchMaster } from '@/app/store/masterSlice';
import { OtherIcons } from '@/assests/icons';
import LayOut from '@/components/LayOut';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const AddMaster = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [itemId, setItemId] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const idFromParams = params.get("id");
            if (idFromParams) {
                setItemId(idFromParams);
            }
        }
    }, []);


    const [editId, setEditId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const idFromParams = params.get("id");
            const editMode = params.get("edit"); // Get edit param

            if (idFromParams) {
                setEditId(idFromParams);
            }

            if (editMode === "true") {
                setIsEdit(true);
            }
        }
    }, []);

    const masterListData = useSelector((state) => state.master?.list || []).filter((val) => val.id == Number(itemId));
    const masterLoading = useSelector((state) => state.master);


    const [formData, setFormData] = useState({
        id: 0,
        // labelid:0,
        type: itemId || 0,
        label: null,
        value_string: null,
        value: null,
        note: null,
    });

    const [errors, setErrors] = useState({
        label: false
    })

    useEffect(() => {
        if (editId) {

            dispatch(fetchMaster());
        }

    }, [editId, dispatch,]);

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

    useEffect(() => {
        if (itemId !== undefined && itemId !== null) {
            setFormData((prev) => ({ ...prev, type: Number(itemId) }));
        }
    }, [itemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {
            label: formData?.label ? false : true,

        }
        setErrors(newErrors);
        const hasAnyError = Object.values(newErrors).some(
            (value) => value === true
        );
        if (hasAnyError) {

            return;
        } else {
            try {
                const sendData = {
                    ...formData,

                }
                dispatch(addMaster({ userData: sendData, router }));
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    console.log("formData", formData)
    console.log("masterListData", masterListData)
    useEffect(() => {
        if (masterListData?.length > 0 && editId && isEdit) {
            setFormData((prev) => {
                if (prev.id !== masterListData[0]?.id) { // Prevent unnecessary updates
                    return {
                        id: masterListData[0]?.id,
                        type: masterListData[0]?.type,
                        label: masterListData[0]?.label,
                        value_string: masterListData[0]?.value_string,
                        value: masterListData[0]?.value,
                        note: masterListData[0]?.note
                    };
                }
                return prev;
            });
        }
    }, [masterListData, editId, isEdit]); // ✅ Correct dependencies
    


    const handleClose = () => {
        router.push(`/master/list`)
        // localStorage.removeItem("itemId", itemId2)
    }


    return (
        <LayOut> <div className="flex-col justify-center items-center mx-auto sm:flex sm:mx-0">
            <div className="flex justify-content-between w-full">
                <div className="text-[32px] text-2xl w-full sm:ml-[7px] tracking-tight">{isEdit ? "Update Master" : "Add New Master"}  </div>
                <div className="flex justify-end absolute right-3 top-[90px]">
                    <button
                        onClick={handleClose}
                        className="text-gray-700 hover:text-black">
                        <CircleX size={30} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
            <div className="h-screen justify-between items-center mx-auto sm:-mt-16 sm:flex xl:lg:-mt-[70px]">
                <form className="bg-white h-[656px] p-3 rounded-lg sm:p-8 sm:w-[690px] space-y-8" onSubmit={handleSubmit}>
                    <div className="flex-col justify-between items-start sm:flex sm:flex-row sm:items-center">
                        <label className="text-[20px] block">
                            Name <span className='text-red-600'>*</span>
                        </label>
                        <div className="flex flex-col w-[310px] md:w-[400px] sm:w-[350px]">
                            <input
                                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m placeholder:text-gray-400"
                                type="text"
                                name="label"
                                placeholder="Enter Name"
                                value={formData?.label || ""}
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            {errors?.label && (
                                <p className="flex text-red-500 text-sm items-center mt-2">
                                    {OtherIcons.error_svg} <span className="ml-1">Please Enter Name</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex-col justify-between items-start sm:flex sm:flex-row sm:items-center">
                        <label className="text-[20px] block">
                            Number Value
                        </label>
                        <div className="flex flex-col w-[310px] md:w-[400px] sm:w-[350px]">
                            <input
                                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m placeholder:text-gray-400"
                                type="text"
                                name="value"
                                placeholder="Enter Value"
                                value={formData?.value || ""}
                                onChange={handleChange}
                                autoComplete="off"
                            />

                        </div>
                    </div>
                    <div className="flex-col justify-between items-start relative sm:flex sm:flex-row sm:items-center">
                        <label className="text-[20px] block">
                            Text Value
                        </label>
                        <div className="w-[310px] md:w-[400px] relative sm:w-[350px]">
                            <input
                                className="border border-[#0000004D] h-10 p-2 rounded-lg text-m w-full placeholder:text-gray-400 pr-10"
                                type="number"
                                name="value_string"
                                placeholder="Enter Text Value"
                                value={formData?.value_string || ""}
                                onChange={handleChange}
                                autoComplete="off"
                            />


                        </div>
                    </div>
                    <div className="justify-between sm:flex">
                        <label className="text-[20px] block">Comment</label>
                        <textarea className="border border-[#0000004D] h-40 p-2 rounded-lg text-m w-[310px] md:w-[400px] placeholder:text-gray-400 sm:ml-[35px] sm:w-[350px]" type='text' placeholder='Enter Comment....' value={formData?.note || ""} onChange={handleChange} name='note' autoComplete='off' />
                    </div>


                    <div className='justify-end w-full sm:flex'>
                        <button
                            type="submit"
                            className="flex bg-black border border-[#0000004D] h-10 justify-center p-2 rounded-lg text-gray-100 text-m w-[310px] items-center md:w-[400px] sm:w-[350px]"
                            disabled={masterLoading?.loading}
                        >
                            {masterLoading?.loading ? (
                                <div className="border-2 border-gray-100 border-t-transparent h-5 rounded-full w-5 animate-spin"></div>
                            ) : (
                                isEdit ? "Update" : "Submit"
                            )}
                        </button>
                    </div>


                </form>
            </div>
        </div></LayOut>

    );
}

export default AddMaster;
