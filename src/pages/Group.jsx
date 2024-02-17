import React ,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import Groupsmain from "./Groupsmain";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Group = () => {
  //acces group id from param
const {groupid} = useParams();
const navigate = useNavigate();
const [userData, setUserData] = useState({});
const backendUrl = "https://hostel-bank-be-deepsalunkhee.vercel.app"; 

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
    <div>
      <Navbar user={userData.email} />
      <div className="bg-blue-200  m-1">
        <div className="overflow-y-auto" style={{ height:"86vh" }}>
          <Groupsmain groupid={groupid} />
        </div>
      </div>
    </div>
  );
};

export default Group;
