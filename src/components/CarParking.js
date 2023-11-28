import React from "react";
import {  useSelector } from "react-redux";
import {  SelectedSlot } from "../features/GenerateSlices";
import Slots from "./Slots";

const CarParking = () => {
  const slotsData = useSelector(SelectedSlot);

  return (
    <>
      {slotsData !== null ? (
        <Slots slotNumber={parseInt(slotsData.slots)} />
      ):""}
    </>
  );
};
export default CarParking;
