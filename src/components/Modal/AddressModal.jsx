// import React from 'react';

// export default function AddressModal({ isOpen, closeModal }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white rounded-lg p-6 w-1/3">
//                 <h3 className="text-lg font-medium leading-6 text-gray-900">Enter Address</h3>
//                 <div className="mt-2">
//                     <input
//                         type="text"
//                         placeholder="Enter your address"
//                         className="w-full p-2 border rounded-md"
//                     />
//                 </div>
//                 <div className="mt-4 flex space-x-2 justify-end">
//                     <button
//                         type="button"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                         onClick={closeModal}
//                     >
//                         Close
//                     </button>
//                     <button
//                         type="button"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//                         onClick={closeModal}
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import Button from '../Button/Button';

export default function AddressModal({ isOpen, closeModal }) {
    const [addresses, setAddresses] = useState(['']);

    const addAddressField = () => {
        setAddresses([...addresses, '']);
    };

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const handleSave = () => {
        // Handle save logic here (e.g., send addresses to an API or update state in a parent component)
        console.log('Saved addresses:', addresses);
        closeModal();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 h-3/4">
                <h3 className="text-lg font-bold leading-6 text-gray-900">Enter Addresses</h3>
                <div className="mt-2 space-y-4 overflow-y-auto h-3/4 pr-2">
                    {addresses.map((address, index) => (
                        <input
                            key={index}
                            type="text"
                            value={address}
                            onChange={(e) => handleAddressChange(index, e.target.value)}
                            placeholder={`Enter address ${index + 1}`}
                            className="w-full p-2 border rounded-md"
                        />
                    ))}
                </div>
                <div className="mt-8 flex justify-between">
                    <Button
                        children="Add Another Address"
                        className="border border-purple-400"
                        variant="white"
                        onClick={addAddressField}
                    />
                    <div className="flex space-x-2">
                        <Button
                            children="Close"
                            onClick={closeModal}
                        />
                        <Button
                            children="Save"
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
