import axios from "axios";
import React, { useEffect, useState } from "react";

const Groupsmain = ({ groupid }) => {
  const baseUrl = "http://localhost:5000";
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupId, setGroupId] = useState(groupid);
  const [groupName, setGroupName] = useState("");
  const [currUser, setCurrUser] = useState(localStorage.getItem("email"));
  const [user_index_map, setUserIndexMap] = useState({});
  const [transactionMatrix, setTransactionMatrix] = useState([[]]);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    setCurrUser(email);

    try {
      const groupdata = await axios(`${baseUrl}/groups/getgroupinfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
          groupid: groupId,
          user: email,
        },
      });

      setGroupName(groupdata.data.name);
      setGroupUsers(groupdata.data.users);
      //mapping user email to index
      let temp = {};
      groupdata.data.users.forEach((user) => {
        temp[user.email] = user.member_id;
      });

      setUserIndexMap(temp);
      console.log(user_index_map);

      //setting taransaction matrix

      let temp_trasactionmatrix = groupdata.data.transction_matrix;
      let tempt = [];
      console.log(temp_trasactionmatrix);
      temp_trasactionmatrix.forEach((row) => {
        console.log(row);
        tempt.push(row);
      });

      console.log(tempt);

      setTransactionMatrix(tempt);
      console.log(transactionMatrix);
    } catch (error) {}
  };

  const RequestMoney = async (from, to, groupid, amount, note,type) => {
    //chek if ampunt is a number
    if (isNaN(amount) || amount <= 0 || amount === "" || note === "") {
      alert("Please enter a valid amount and Note");
      return;
    }

    const token = localStorage.getItem("token");

    const request = await axios(`${baseUrl}/transaction/request`, {
      method: "POST",
      headers: {
        " constent-type": "application/json",
        token: token,
      },
      data: {
        groupid: groupid,
        requestfrom: from,
        requestto: to,
        amount: amount,
        note: note,
      },
    });

    if (request.status === 200) {
      alert(request.data.message);
      fetchdata();
      //sending notification logic
      try {

        const send_notification =await axios(`${baseUrl}/notification/send`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            token:token
          },
          data:{
            groupid:groupid,
            from:from,
            to:to,
            amount:amount,
            note:note,
            type:type
          }

          
        })

        //console.log(send_notification);
        const email_notification =await axios(`${baseUrl}/emailnotifications/send`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            token:token
          },
          data:{
            groupid:groupid,
            from:from,
            to:to,
            amount:amount,
            type:type
          }
        })

        console.log(email_notification);
        
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSettle = async (from, to, groupid, amount, type) => {
    //chek if ampunt is a number
    if (amount === 0) {
      alert("Nothing to settle");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to proceed?");

    // Check if user confirmed
    if (confirmed) {
      // User agreed, proceed with action
      const token = localStorage.getItem("token");
      try {
        const settle = await axios(`${baseUrl}/transaction/settle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          data: {
            groupid: groupid,
            requestfrom: from,
            requestto: to,
            amount: amount,
            type: type,
          },
        });

        if (settle.status === 200) {
          fetchdata();
          //sending notification logic and add to history
          try {

            const send_notification =await axios(`${baseUrl}/notification/send`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                token:token
              },
              data:{
                groupid:groupid,
                from:from,
                to:to,
                amount:amount,
                note:"settled",
                type:type
              }

              
            })

            //console.log(send_notification);

            const addHistory= await axios(`${baseUrl}/history/add`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                token:token
              },
              data:{
                groupid:groupid,
                from:from,
                to:to,
                amount:amount,
                type:type


              }
            })

            //console.log(addHistory);

            const email_notification =await axios(`${baseUrl}/emailnotifications/send`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
                token:token
              },
              data:{
                groupid:groupid,
                from:from,
                to:to,
                amount:amount,
                type:type
              }
            })

            console.log(email_notification);
            
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Something went wrong");
        }
      } catch (error) {}
    } else {
      // User did not agree, handle accordingly
      console.log("User did not agree");
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md ">
      <h1 className="text-xl font-bold mb-2">{groupName}</h1>
      <table className="w-full border-collapse border border-blue-500 ">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-blue-500 py-2 px-2">Email</th>
            <th className="border border-blue-500 py-2 px-2">To give</th>
            <th className="border border-blue-500 py-2 px-2">To take</th>
            <th className="border border-blue-500 py-2 px-2">Request money</th>
          </tr>
        </thead>
        <tbody>
          {groupUsers.map((user, index) => (
            <tr key={index} className="hover:bg-blue-200">
              <td className="border border-blue-500 py-2 px-4">{user.email}</td>
              <td className="border border-blue-500 py-2 px-4">
                <div className="flex flex-row justify-between">
                  <span>
                    {
                      transactionMatrix[user_index_map[currUser]][
                        user_index_map[user.email]
                      ]
                    }
                  </span>
                  <button
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => {
                      handleSettle(
                        currUser,
                        user.email,
                        groupId,
                        transactionMatrix[user_index_map[currUser]][
                          user_index_map[user.email]
                        ],
                        "toGive"
                      );
                    }}
                  >
                    Settle
                  </button>
                </div>
              </td>
              <td className="border border-blue-500 py-2 px-4">
                <div className="flex flex-row justify-between">
                  <span>
                    {
                      transactionMatrix[user_index_map[user.email]][
                        user_index_map[currUser]
                      ]
                    }
                  </span>
                  <button
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => {
                      handleSettle(
                        currUser,
                        user.email,
                        groupId,
                        transactionMatrix[user_index_map[user.email]][
                          user_index_map[currUser]
                        ],
                        "toTake"
                      );
                    }}
                  >
                    Settle
                  </button>
                </div>
              </td>

              {currUser === user.email ? (
                <td className="border border-blue-500 py-2 px-4">
                  {/*place this in center*/}
                  <div className="flex flex-row justify-around">
                    <span>My Account</span>
                  </div>
                </td>
              ) : (
                <td className="border border-blue-500 py-2 px-1">
                  <div className="flex flex-row justify-around">
                    <input
                      className="py-1 border border-gray-300 rounded text-sm p-1" // Removed px-2 and reduced font size
                      id={`amountInput-${index}`}
                      placeholder="Rs"
                    />
                    <input
                      className="py-1 border border-gray-300 rounded text-sm p-1" // Removed px-2 and reduced font size
                      id={`ForInput-${index}`}
                      placeholder="Note"
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" // Adjusted button margin
                      onClick={() => {
                        const amount = document.getElementById(
                          `amountInput-${index}`
                        ).value;
                        const Note = document.getElementById(
                          `ForInput-${index}`
                        ).value;
                        RequestMoney(
                          currUser,
                          user.email,
                          groupId,
                          amount,
                          Note,
                          "Request"
                        );
                        document.getElementById(`amountInput-${index}`).value =
                          "";
                        document.getElementById(`ForInput-${index}`).value = "";
                      }}
                    >
                      Request
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Groupsmain;
