import React from "react";
import { UserData } from "../features/UserSlices";
import { SelectedSlot } from "../features/GenerateSlices";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector(UserData);
  const slotsData = useSelector(SelectedSlot);

  return (
    <div className="md:w-4/5">
      <div className="grid md:grid-cols-2 md:w-4/5 gap-6 pt-4 md:pt-8 ">
        <div className="bg-pink-500/20 rounded p-5 text-center shadow-lg">
          <p className="text-xl md:text-2xl font-semibold uppercase  text-zinc-600">
            Slots Available
          </p>
          <p className="font-medium text-2xl md:text-3xl pt-1 md:pt-5">
            {slotsData === null ? 0 : slotsData.slots}
          </p>
        </div>
        <div className=" bg-amber-500/20 rounded p-5 text-center shadow-lg">
          <p className="text-xl md:text-2xl uppercase font-semibold text-zinc-600">
            Allotted Slots
          </p>
          <p className="font-medium text-2xl md:text-3xl pt-1 md:pt-5">
            {userData.length || 0}
          </p>
        </div>
        <div className=" bg-purple-500/50 rounded p-5 text-center shadow-lg">
          <p className="text-xl md:text-2xl uppercase font-semibold text-zinc-600">
            Available Slots
          </p>
          <p className="font-medium text-2xl md:text-3xl pt-1 md:pt-5">
            {slotsData !== null ? slotsData.slots - userData.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
