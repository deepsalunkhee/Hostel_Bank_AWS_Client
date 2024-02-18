import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const backendUrl = "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
  
    try {
      const getgroups = await axios(`${backendUrl}/groups/getgroups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: JSON.stringify({
          email: email,
        }),
      });

      setGroups(getgroups.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickGroup = (groupid) => {
    navigate(`/group/${groupid}`);
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Groups</h1>
      <div className="grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <div
            key={group.group_id}
            className="bg-yellow-50 p-4 rounded-lg shadow-md flex  flex-row justify-between "
          >
            <h1 className="text-xl font-bold mb-2 hover:cursor-pointer" onClick={()=>clickGroup(group.group_id)} >{group.group_name}</h1>
            <h1 className="text-lg flex items-center">
              {group.group_id}
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded font-thin ml-2"
                onClick={()=>{
                  navigator.clipboard.writeText(group.group_id)
                  alert("Copied")
                }}
              >
                Copy
              </button>
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
