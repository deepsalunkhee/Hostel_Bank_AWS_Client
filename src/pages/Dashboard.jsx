import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigator from "./Navigator";

const Dashboard = () => {
  const backendUrl =  import.meta.env.VITE_BASE; // Define backend URL
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Call the fetchUserData function
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      try {
        // Fetch user data using Axios with the correct URL
        const getuserdata = await axios.get(`${backendUrl}/users/userdata`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        setUserData({
          email: getuserdata.data.email,
        });

        //saving user email in local storage
        localStorage.setItem("email", getuserdata.data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      
      <Navbar user={userData.email} />
      <Navigator/>
    </div>
  );
};

export default Dashboard;
