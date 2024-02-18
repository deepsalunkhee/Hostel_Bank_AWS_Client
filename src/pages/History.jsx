import axios from 'axios';
import React, { useEffect,useState } from 'react'

const History = () => {
  const baseurl = "http://localhost:5000";

  const [history, setHistory] = useState([]);

  useEffect(()=>{
    getHistory();
  
  },[])

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZoneName: 'short'
    };
    return date.toLocaleString('en-US', options);
};

  const getHistory = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    try {
      const reqhistory = await axios(`${baseurl}/history/get`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          token:token,
          email:email
        }
      })

      
      const history = reqhistory.data.map((history)=>{
        return {
          ...history,
          date:formatDateString(history.date)
        }
      });
      history.reverse();
      setHistory(history);
      console.log(history);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">History</h1>
      <div>
  {history.map((history, index) => (
    <div
      key={index}
      className={`bg-white shadow-md rounded-lg p-4 mb-4 ${
        history.history_type === "received" ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {history.history_type === "Received" ? (
            <span className="text-green-500">Received</span>
          ) : (
            <span className="text-red-500">Sent</span>
          )}
        </h2>
        <p className="text-gray-500">{history.date}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-600">{history.note}</p>
        <p className="text-gray-600">Amount: {history.amount}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}

export default History

