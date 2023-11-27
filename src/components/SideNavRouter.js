import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import CarParking from "./CarParking";

const SideNavRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/car-parking" element={<CarParking />} />
    </Routes>
  );
};

export default SideNavRouter;
