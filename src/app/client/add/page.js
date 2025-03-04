"use client"
import LayOut from '@/components/LayOut';

const AddUser = () => {
  
    return (
        <LayOut> <div className="flex">
            <div className="text-2xl tracking-tight ml-[70px]">Add New Client</div>

            <div className="flex   justify-between items-center h-screen mx-auto">
                <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-8">
                    <div className="flex  justify-between items-center">
                        <label className="block text-m ">Client Name*</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Client Name' />
                    </div>

                    <div className="flex  justify-between items-center">
                        <label className="block text-m">Email Address*</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7 placeholder:text-gray-700" type='text' placeholder='Enter Email Address' />
                    </div>

                    <div className="flex  justify-between items-center">
                        <label className="block text-m">Contact Person Name</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-3 placeholder:text-gray-700" type='text' placeholder='Enter Name' />
                    </div>

                    <div className="flex  justify-between items-center">
                        <label className="block text-m">Username</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[60px] placeholder:text-gray-700" type='text' placeholder='Enter Username' />
                    </div>

                    <div className="flex  justify-between items-center">
                        <label className="block text-m ">Password</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1 placeholder:text-gray-700" type='text' placeholder='Enter Password' />
                    </div>
                    <div className="flex  justify-between items-center">
                        <label className="block text-m ">Confirm Password</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1 placeholder:text-gray-700" type='text' placeholder='Enter Confirm Password' />
                    </div>




                    <div className='flex w-full justify-end'>
                        <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m   bg-black text-gray-100 ">Submit</button>
                    </div>
                </form>
            </div>
        </div></LayOut>

    );
}

export default AddUser;
