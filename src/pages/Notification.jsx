import axios from "axios";
import React, { useEffect, useState } from "react";

const Notification = () => {
  const baseurl = "https://hostel-bank-be-deepsalunkhee.vercel.app";
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications();
  }, []);

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


  const getNotifications = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    try {
      const reqnotification = await axios(`${baseurl}/notification/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
          email: email,
        },
      });

      const notifications = reqnotification.data.map((notification) => {
        return {
          ...notification,
          date: formatDateString(notification.date),
        };
      });
       //reverse the array to show the latest notification first
        notifications.reverse();
        console.log(notifications);
        setNotifications(notifications);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div>
        {notifications.map((notification, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
            <div className="p-4">
            <div className="flex flex-row justify-between">
            <h3 className="text-lg font-semibold mb-2">
                {notification.notification_type === "toGive" && "Received"}
                {notification.notification_type === "toTake" && `Settled the amount "To Give" to 0`}
                {notification.notification_type === "Request" && "Requested"}
              </h3>
              <p className="text-gray-600">{notification.date}</p>
            </div>
             
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 mb-1">From: {notification.from}</p>
                  <p className="text-gray-600 mb-1">Amount: {notification.amount}</p>
                </div>
                <div>
                   { notification.group_name && <p className="text-gray-600 mb-1">Group: {notification.group_name}</p>}
                  <p className="text-gray-600 mb-1">Note: {notification.note}</p>
                </div>
               
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Notification;
