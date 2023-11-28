import React from "react";
import { useSelector } from "react-redux";
import { SelectedSlot } from "../features/GenerateSlices";
import Slots from "./Slots";

const CarParking = () => {
  const slotsData = useSelector(SelectedSlot);

  return (
    <>
      {slotsData !== null ? (
        <Slots slotNumber={parseInt(slotsData.slots)} />
      ) : (
        <div className="flex items-center justify-center w-full text-3xl font-medium text-slate-500">You need to generate slots first...</div>
      )}
    </>
  );
};
export default CarParking;
