import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/helper';
import axios from 'axios';
import Button from '../../components/Button/Button';
import AcceptAddressModal from '../../components/Modal/AcceptAddressModal';
import Navbar from '../../components/Navbar/Navbar';

function ListAddress() {
    const [addresses, setAddresses] = useState([]);
    const access_token = getCookie('access_token');

    const handleAction = (action, address) => {
        console.log(`${action} action for address: ${address}`);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        // Add save functionality here
        setIsModalOpen(false);
    };

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/requestedProperties`,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                setAddresses(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <div className="w-full z-10 px-4 border-b">
                <Navbar />
            </div>
            <div className=" max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Addresses</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            addresses.length === 0 ?
                                <tr>
                                    <td colSpan="2" className="py-4 px-4 text-center">
                                        <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin mx-auto" style={{ animationDuration: '3s' }}></div>
                                    </td>
                                </tr>
                                :
                                addresses.map((address, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{address.address}</td>
                                        <td className="py-2 px-4 border-b flex justify-center">
                                            <Button
                                                children="Accept"
                                                className="bg-purple-500 text-white py-1 px-3 rounded mr-2 hover:bg-purple-600"
                                                onClick={handleOpenModal}
                                            />
                                            <Button
                                                children="Reject"
                                                className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600"
                                                onClick={() => handleAction('Reject', address)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                        <AcceptAddressModal isOpen={isModalOpen} onCloseModal={handleCloseModal} onSave={handleSave} />
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAddress;