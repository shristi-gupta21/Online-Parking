import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUser,
  SearchUsers,
  updateUser,
  UpdateUsers,
  UserData,
} from "../features/UserSlices";
import { addSlot, SelectedSlot } from "../features/GenerateSlices";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import EnterDetails from "./EnterDetails";

const Slots = ({ slotNumber, onShowDetails }) => {
  const userData = useSelector(UserData);
  const slotNumbersArray = Array.from(
    { length: slotNumber },
    (_, index) => index + 1
  );
  const slotsData = useSelector(SelectedSlot);
  const searchedData = useSelector(SearchUsers);
  const [searchObj, setSearchObj] = useState();
  const dispatch = useDispatch();
  const updateUserData = useSelector(UpdateUsers);
  const [addClick, setAddClick] = useState(false);
  const [filledSlot, setFilledSlot] = useState([]);
  const [clickedSlot, setClickedSlot] = useState();
  useEffect(() => {
    if (searchedData !== "") {
      showSearchedUser(searchedData);
    } else {
      showSearchedUser(searchedData);
    }
    userData.map((item) => setFilledSlot((prev) => [...prev, item.slotNumber]));
  }, [searchedData, updateUserData, userData]);

  const onClickRemoveData = (i) => {
    console.log("i",i)
    dispatch(removeUser({ index: i }));
    const newArr = userData.filter(item => parseInt(item.slotNumber) === i+1);
    updateUserData !== null && dispatch(updateUser({ index: null }));
    dispatch(addSlot({ slots: slotsData.slots + 1 }));
  };

  const onClickUpdateData = (i) => {
    dispatch(updateUser({ index: i }));
  };

  const showSearchedUser = (data) => {
    if (data !== "") {
      const obj = userData.filter((item) =>
        item.regNumber.toLowerCase().includes(data)
      );
      const d = { obj: obj, fetch: true };
      setSearchObj(d);
    } else {
      const obj = userData.filter((item) =>
        item.regNumber.toLowerCase().includes(data)
      );
      const d = { obj: obj, fetch: false };
      setSearchObj(d);
    }
  };
  const onClickAdd = (slot) => {
    setAddClick(!addClick);
    setClickedSlot(slot);
    // filledSlot = []
    // setFilledSlot(filledSlot)
    if (addClick) {
      document
        .querySelector(".add-details-btn")
        .addEventListener("click", () => {
          setAddClick(false);
        });
    }
  };

  return (
    <div>
      {addClick && <EnterDetails />}
      <h1 className="text-center py-4 font-semibold w-full text-xl uppercase">
        Slots
      </h1>
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        {slotNumbersArray.map((slotNum) => (
          <div
            key={"slot" + slotNum}
            onClick={onShowDetails}
            className="border rounded p-3 h-fit"
          >
            {userData.length < 1 ? (
              <button
                className="px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                onClick={() => onClickAdd(slotNum)}
              >
                Add Vehicle
              </button>
            ) : (
              userData.map(
                (item) =>
                  parseInt(item.slotNumber) === slotNum && (
                    <div className="flex w-64 items-start">
                      <div className="w-4/5">
                        <p className="text-center">Slot {item.slotNumber}</p>
                        <p>{item.name}</p>
                        <p>{item.regNumber}</p>
                        <p>{item.vehicle}</p>
                      </div>
                      {
                        <div className="flex flex-col items-end w-1/5">
                          <button
                            onClick={() =>
                              onClickRemoveData(item.slotNumber - 1)
                            }
                            className=" text-red-500"
                          >
                            <RemoveCircleIcon />
                          </button>
                          <button className="text-gray-700">
                            <EditIcon />
                          </button>
                        </div>
                      }
                    </div>
                  )
              )
            )}
            {filledSlot.length > 0 &&
              userData.map((slot) =>
                filledSlot.map(
                  (item) =>
                    item.slotNumber !== slot && (
                      <button
                        onClick={onClickAdd}
                        className="px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                      >
                        Add
                      </button>
                    )
                )
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slots;
