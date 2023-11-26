import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideNav = () => {
  const [page, setPage] = useState('');
  console.log(page)
  return (
    <>
      <div className="flex items-end gap-y-8 pt-8 flex-col font-bold text-xl h-[30rem]">
        <Link to="/" onClick={()=>setPage('dashboard')} className="uppercase flex items-center gap-3">
          <DashboardIcon />
          Dashboard
        </Link>
        <Link to="/car-parking" onClick={()=>setPage('car-parking')} className="uppercase flex items-center gap-3">
          <DirectionsCarFilledIcon />
          Parking Space
        </Link>
      </div>
    </>
  );
};

export default SideNav;
