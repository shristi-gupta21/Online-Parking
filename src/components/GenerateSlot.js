import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSlot, SelectedSlot, totalSlot } from "../features/GenerateSlices";

const GenerateSlot = () => {
  const dispatch = useDispatch();
  const slotsData = useSelector(SelectedSlot);
  const [enterSlot, setEnterSlot] = useState("");
  const [totalSlotsAvailable, setTotalSlotAvailable] = useState(0);

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
    <div className="ml-2 py-5 px-3 h-fit bg-gradient-to-r from-purple-800 to-blue-350 rounded-lg">
      <form action="" className="flex flex-col gap-y-6" onSubmit={(e) => onClickGenerate(e)}>
        <div className="flex items-center gap-4">
          <label className=" text-white font-medium" htmlFor="">
            Generate Slots:
          </label>
          <input
            pattern="[0-9.]+"
            type="text"
            onChange={(e) => onChangeEnterSlot(e)}
            value={enterSlot || ""}
            className="h-8 bg-white/50 shadow rounded px-4 w-1/2"
          />
        </div>
        <button
          className="py-2 bg-white/25 rounded shadow w-full font-medium hover:bg-white/60 cursor-pointer"
          type="submit"
          disabled={enterSlot === ""}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default GenerateSlot;
