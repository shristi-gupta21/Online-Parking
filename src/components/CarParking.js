import React from "react";
import { useSelector } from "react-redux";
import { SelectedSlot } from "../features/GenerateSlices";
import { UserData } from "../features/UserSlices";
import Slots from "./Slots";

const CarParking = () => {
  const slotsData = useSelector(SelectedSlot);
  const userData = useSelector(UserData);
  return (
    <>
      {slotsData !== null ? (
        <Slots slotNumber={parseInt(slotsData.slots)+ userData.length} />
      ) : (
        <div className="flex items-center justify-center h-80 md:h-96 md:w-full text-xl md:text-3xl font-medium text-slate-500">
          You need to generate slots first...
        </div>
      )}
    </>
  );
};
export default CarParking;
