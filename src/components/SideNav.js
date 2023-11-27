import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Link } from "react-router-dom";
import { useState } from "react";
import GenerateSlot from "./GenerateSlot";
import {  useSelector } from "react-redux";
import {  SelectedSlot } from "../features/GenerateSlices";
const SideNav = () => {
  const [page, setPage] = useState("dashboard");
  const slotsData = useSelector(SelectedSlot);
  console.log(slotsData)
  return (
    <div className="flex flex-col w-2/12 h-full">
      <div className="flex items-end gap-y-8 pt-8 flex-col font-bold text-xl h-[30rem]">
        <Link
          to="/"
          onClick={() => setPage("dashboard")}
          className={`${
            page === "dashboard"
              ? " text-white bg-gradient-to-r from-purple-800 to-blue-350 translate-x-4 shadow rounded px-4 py-3 "
              : " text-black bg-none"
          } w-full justify-end uppercase flex items-center gap-3`}
        >
          <DashboardIcon />
          Dashboard
        </Link>
        <Link
          to="/car-parking"
          onClick={() => setPage("car-parking")}
          className={`       
          ${
            page === "car-parking"
              ? " text-white bg-gradient-to-r from-purple-800 to-blue-350 rounded shadow translate-x-4 px-4 py-3"
              : " text-black bg-none"
          } w-full justify-end uppercase flex items-center gap-3`}
        >
          <DirectionsCarFilledIcon />
          Parking Space
        </Link>
      </div>
      <div className="flex justify-center">
          <GenerateSlot />
      </div>
    </div>
  );
};

export default SideNav;