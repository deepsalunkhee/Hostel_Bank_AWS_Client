import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
    const [userName, setUserName] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        setUserName(user);
    }, [user]);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
    }

    return (
        <div className="bg-blue-800 text-white py-4 px-6 flex justify-between items-center">
            <div>
                <h3 className="text-2xl font-semibold hover:cursor-pointer" onClick={()=>{
                    navigate('/');
                }}>Hostel Bank</h3>
            </div>
            <div className='flex items-center'>
                <h3 className="text-lg mr-4">{userName}</h3>
                <button onClick={handleSignOut} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Navbar;
