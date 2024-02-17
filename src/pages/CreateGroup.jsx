import React, { useState,useEffect } from "react";
import axios from "axios";

const CreateGroup = () => {
  const backend= "https://hostel-bank-be-deepsalunkhee.vercel.app"
  
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  
  const[groupCreated,setGroupCreated]=useState(false);



  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      
      const groupstatus= await axios(`${backend}/groups/create`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "token":token
        },
        data:JSON.stringify({
          Groupname:groupName,
          creater:localStorage.getItem("email")
        })
  
      })

      if(groupstatus.status===200){
        alert(groupstatus.data.message)
        console.log(groupstatus.data);
        setGroupCode(groupstatus.data.GroupCode);
        setGroupCreated(true);
      }else{
        alert("Group Not Created")
      }
      
    } catch (error) {
       console.log(error);
       alert("Something went wrong") 
    }
   
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create Group</h1>
      
      <form onSubmit={handleOnsubmit} className="mb-4">
        <label className="block mb-2">Group Name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
        />
  
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Create Group
        </button>
      </form>
  
      {groupCreated && (
        <div>
          <h1 className="text-3xl font-bold mb-6">Group Code</h1>
          <p className="bg-gray-100 rounded-md px-4 py-2 mb-4">{groupCode}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(groupCode);
              alert("Group Code Copied");
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Copy Group Code
          </button>
        </div>
      )}
    </div>
  );
          };  

export default CreateGroup;
