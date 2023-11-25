import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSlot, SelectedSlot, totalSlot } from "../features/GenerateSlices";
import { UserData } from "../features/UserSlices";

const GenerateSlot = () => {
  const dispatch = useDispatch();
  const slotsData = useSelector(SelectedSlot);
  const [enterSlot, setEnterSlot] = useState("");
  const [totalSlotsAvailable, setTotalSlotAvailable] = useState(0);
  const userData = useSelector(UserData);

  const onClickGenerate = (e) => {
    e.preventDefault();
    if (slotsData === null) {
      dispatch(addSlot({ slots: enterSlot }));
    } else {
      dispatch(
        addSlot({ slots: parseInt(slotsData.slots) + parseInt(enterSlot) })
      );
    }
    setEnterSlot("");
    setTotalSlotAvailable(parseInt(enterSlot) + parseInt(totalSlotsAvailable));
    dispatch(totalSlot(parseInt(enterSlot) + parseInt(totalSlotsAvailable)));
  };
  const onChangeEnterSlot = (e) => {
    const formattedNumber = e.target.value.replace(/[^\d]/g, "");
    setEnterSlot(formattedNumber);
  };
  return (
    <div className="flex flex-col p-6 h-fit bg-yellow-600">
      <form
        action=""
        className="flexMinWidthCol "
        onSubmit={(e) => onClickGenerate(e)}
      >
        <div className="flex justify-center py-6 ">
          <label htmlFor="">Generate Slots:</label>
          <input
            pattern="[0-9.]+"
            type="text"
            onChange={(e) => onChangeEnterSlot(e)}
            value={enterSlot || ""}
          />
        </div>
        <button
          className="py-6 "
          type="submit"
          disabled={enterSlot === ""}
        >
          Generate
        </button>
        <div div className="flex justify-center py-6">
          <label htmlFor="">Available Slots: </label>
          <input type="text" value={totalSlotsAvailable - userData.length} />
        </div>
        <div div className="flex  py-6 justify-center">
          <label htmlFor="">Alloted Slots: </label>
          <input type="text" value={userData.length || 0} />
        </div>
        <div div className="flex  py-6 justify-center">
          <label htmlFor="">Total Slots: </label>
          <input type="text" value={totalSlotsAvailable || 0} />
        </div>
      </form>
    </div>
  );
};

export default GenerateSlot;
