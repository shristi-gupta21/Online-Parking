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

const Slots = ({ slotNumber }) => {
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
  const [data, setData] = useState(Array(slotNumber).fill(null));

  useEffect(() => {
    if (searchedData !== "") {
      showSearchedUser(searchedData);
    } else {
      showSearchedUser(searchedData);
    }
    userData.forEach((item) => {
      const index = item.slotNumber - 1;
      if (index >= 0 && index < data.length) {
        const updatedArray = [...data];
        updatedArray[index] = item;
        setData(updatedArray);
      }
    });
  }, [searchedData, updateUserData, userData]);
console.log(data)
  const onClickRemoveData = (i) => {
    console.log("i", i);
    dispatch(removeUser({ index: i }));
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
  const onClickAdd = () => {
    setAddClick(!addClick);
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
        {slotNumbersArray.map((slotNum) =>
          userData.length < 1 ? (
            <div className="border rounded p-3 h-fit">
              <button
                className="add-btn px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                onClick={() => onClickAdd()}
              >
                Add Vehicle
              </button>
            </div>
          ) : (
            data.map((item) =>
              item !== null ? (
                parseInt(item.slotNumber) === slotNum && (
                  <div className="border px-4 py-2">
                    <p>Slot {item.slotNumber}</p>
                    <p>{item.name}</p>
                    <p>{item.regNumber}</p>
                    <p>{item.color}</p>
                    <p>{item.vehicle}</p>
                  </div>
                )
              ) : (
                <button
                  className="add-btn px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                  onClick={() => onClickAdd()}
                >
                  Add Vehicle
                </button>
              )
            )
          )
        )}
      </div>
    </div>
  );
};
export default Slots;
