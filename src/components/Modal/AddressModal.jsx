import React from 'react';

export default function Modal({ isOpen, closeModal }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Enter Address</h3>
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder="Enter your address"
                        className="w-full p-2 border rounded-md"
                    />
                </div>
                <div className="mt-4 flex space-x-2 justify-end">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        onClick={closeModal}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
