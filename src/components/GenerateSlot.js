import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSlot, SelectedSlot, totalSlot } from "../features/GenerateSlices";
import { UserData } from "../features/UserSlices";
import "./GenerateSlot.css";

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
    <div className="flexCol pdngLG generateSlot">
      <form
        action=""
        className="flexMinWidthCol "
        onSubmit={(e) => onClickGenerate(e)}
      >
        <div className="flexRow justifyCntr mrgnVLG ">
          <label htmlFor="">Generate Slots:</label>
          <input
            pattern="[0-9.]+"
            type="text"
            onChange={(e) => onChangeEnterSlot(e)}
            value={enterSlot || ""}
          />
        </div>
        <button
          className="mrgnVLG pdngVXS"
          type="submit"
          disabled={enterSlot === ""}
        >
          Generate
        </button>
        <div div className="flexRow  justifyCntr mrgnVLG">
          <label htmlFor="">Available Slots: </label>
          <input type="text" value={totalSlotsAvailable - userData.length} />
        </div>
        <div div className="flexRow mrgnVLG justifyCntr">
          <label htmlFor="">Alloted Slots: </label>
          <input type="text" value={userData.length || 0} />
        </div>
        <div div className="flexRow mrgnVLG justifyCntr">
          <label htmlFor="">Total Slots: </label>
          <input type="text" value={totalSlotsAvailable || 0} />
        </div>
      </form>
    </div>
  );
};

export default GenerateSlot;
