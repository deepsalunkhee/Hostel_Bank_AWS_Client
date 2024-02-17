import React, { useState } from "react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import Profile from "./Profile";
import Groups from "./Groups";
import History from "./History";
import Notification from "./Notification";
import Settings from "./Settings";

const Navigator = () => {
  const [selectedMenu, setSelectedMenu] = useState("Notifications");

  const setMenu = (section) => {
    setSelectedMenu(section);
    console.log(section);
  };

  return (
    <div className="grid grid-cols-6 gap-1" style={{ height: "87vh" }}>
      {/* Menu Section */}
      <div className="bg-blue-500 col-span-1 p-4 flex flex-col justify-between">
        <div>
          <ul
            className="flex flex-col space-y-2 justify-between"
            style={{ height: "50vh" }}
          >
            {/* Menu Buttons */}
            <li
              className={`menu-button ${
                selectedMenu === "Notifications"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("Notifications")}
            >
              <button>Notifications</button>
            </li>
            <li
              className={`menu-button ${
                selectedMenu === "Groups"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("Groups")}
            >
              <button>Groups</button>
            </li>
            {/* Pending part*/}
            {/* <li
              className={`menu-button ${
                selectedMenu === "Profile"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3 "
              }`}
              onClick={() => setMenu("Profile")}
            >
              <button>Profile</button>
            </li> */}
            <li
              className={`menu-button ${
                selectedMenu === "Create Groups"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("Create Groups")}
            >
              <button>Create Groups</button>
            </li>
            <li
              className={`menu-button ${
                selectedMenu === "Join Groups"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("Join Groups")}
            >
              <button>Join Groups</button>
            </li>
            <li
              className={`menu-button ${
                selectedMenu === "History"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("History")}
            >
              <button>History</button>
            </li>
            <li
              className={`menu-button ${
                selectedMenu === "Settings"
                  ? "bg-blue-200 text-black rounded  px-3"
                  : "bg-blue-500 text-white  hover:bg-blue-100  hover:text-amber-900 hover:rounded  px-3"
              }`}
              onClick={() => setMenu("Settings")}
            >
              <button>Settings</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-blue-200 col-span-5 p-4 overflow-y-auto">
        {/* logic that changes the page according to selected menu*/}
        {selectedMenu === "Notifications" && <Notification/>}
        {selectedMenu === "Groups" && <Groups />}
        {/* Pending part*/}
        {/* {selectedMenu === "Profile" && <Profile />} */}
        {selectedMenu === "History" && <History />}
        {selectedMenu === "Join Groups" && <JoinGroup />}
        {selectedMenu === "Create Groups" && <CreateGroup />}
        {selectedMenu === "Settings" &&  <Settings/>}
      </div>
    </div>
  );
};

export default Navigator;
