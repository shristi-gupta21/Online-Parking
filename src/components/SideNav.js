import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Link } from "react-router-dom";
import { useState } from "react";
import GenerateSlot from "./GenerateSlot";

const SideNav = () => {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex justify-between w-full flex-col-reverse md:flex-col md:w-1/6 h-full">
      <div className="flex mx-auto justify-between  md:justify-start items-center pt-4 md:items-end gap-x-4 md:gap-x-0 md:gap-y-8 md:pt-8 md:flex-col font-bold md:text-xl md:h-[25rem] xl:h-[30rem] 2xl:h-[40rem]">
        <Link
          to="/"
          onClick={() => setPage("dashboard")}
          className={`${
            page === "dashboard"
              ? "lg:w-60 text-white bg-gradient-to-r from-purple-800 to-blue-350 lg:translate-x-4 shadow rounded p-2 md:px-4 md:py-3 "
              : "lg:w-full text-black bg-none"
          }  md:justify-end uppercase flex items-center gap-3`}
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
              ? "lg:w-60 text-white bg-gradient-to-r from-purple-800 to-blue-350 rounded shadow lg:translate-x-4 p-2 md:px-4 md:py-3"
              : "lg:w-full text-black bg-none"
          }  md:justify-end uppercase flex items-center gap-3`}
        >
          <DirectionsCarFilledIcon />
          Parking Space
        </Link>
      </div>
      <div className="flex justify-center md:w-48 lg:w-60">
        <GenerateSlot />
      </div>
    </div>
  );
};

export default SideNav;
