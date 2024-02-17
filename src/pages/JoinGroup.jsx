import React,{useState} from 'react'
import axios from 'axios'

const JoinGroup = () => {

  const backendUrl = "https://hostel-bank-be-deepsalunkhee.vercel.app";
  const [groupid,setGroupid] = useState('')
  const [groupname,setGroupname] = useState('')
  const [joined,setJoined] = useState(false)


  const hadleOnsubmit = async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem("token");
    

    try {
      const joinrequest= await axios (`${backendUrl}/groups/joingroup`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
          token:token
        },
        data:JSON.stringify({
          groupid:groupid
        })
      })

      if(joinrequest.status===200){
        alert(joinrequest.data.message)
        setJoined(true)
        setGroupname(joinrequest.data.groupname)
      }else if(joinrequest.status===207){
        console.log(joinrequest.data.message)
      }
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
   
  }
  return (
    <div>
      <form  onSubmit={hadleOnsubmit}>
        <div className="flex flex-col p-4">
          <h1 className="text-3xl font-bold mb-4">Join Group</h1>
          
          <input
            type="text"
            className="p-2 mb-4 w-80 border-2 border-gray-500 rounded-lg"
            placeholder="Enter Group ID"
            onChange={(e)=>{setGroupid(e.target.value)}}
          />
          <button
            className="bg-blue-500 w-80 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            type="submit"
          >
            Join
          </button>
        </div>
      </form>
      {joined && <h1 className="text-2xl font-bold text-center mt-4">Joined {groupname} Successfully </h1>}
    </div>
  )
}

export default JoinGroup