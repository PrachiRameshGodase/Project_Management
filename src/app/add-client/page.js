"use client"
import LayOut from '@/components/LayOut';

const AddUser = () => {
  
    return (
        <LayOut> <div className="flex">
            <div className="text-2xl tracking-tight mt-12 ml-[70px]">Add New Client</div>

            <div className="flex justify-center items-center h-screen mx-auto">
                <form className="w-[600px] h-[656px] bg-white p-8 rounded-lg space-y-8">
                    <div className="flex">
                        <label className="block text-m ">Client Name*</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter Client Name' />
                    </div>

                    <div className="flex">
                        <label className="block text-m">Email Address*</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-7" type='text' placeholder='Enter Email Address' />
                    </div>

                    <div className="flex">
                        <label className="block text-m">Contact Person Name</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-3" type='text' placeholder='Enter Name' />
                    </div>

                    <div className="flex">
                        <label className="block text-m">Username</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[60px]" type='text' placeholder='Enter Username' />
                    </div>

                    <div className="flex">
                        <label className="block text-m ">Password</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1" type='text' placeholder='Enter Password' />
                    </div>
                    <div className="flex">
                        <label className="block text-m ">Confirm Password</label>
                        <input className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-1" type='text' placeholder='Enter Confirm Password' />
                    </div>




                    <button className="w-[350px] h-10 border border-gray-300 rounded-lg p-2 text-m ml-[110px] bg-black text-gray-100 mr-2">Submit</button>
                </form>
            </div>
        </div></LayOut>

    );
}

export default AddUser;
