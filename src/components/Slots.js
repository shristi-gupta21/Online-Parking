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
    setAddClick((prevAddClick) => !prevAddClick);
  };
  
  if (!addClick) {
    const btnClickHandler = (event) => {
      // Handle the click on the "add" or "close" button inside the form
      setAddClick(false);
      const buttonClass = event.currentTarget.classList[0];
      document.querySelector(`.${buttonClass}`).removeEventListener("click", btnClickHandler);
    };
  
    const addDetailsBtn = document.querySelector(".add-details-btn");
    const closeDetailsBtn = document.querySelector(".close-btn");
  
    if (addDetailsBtn) {
      addDetailsBtn.addEventListener("click", btnClickHandler);
    }
  
    if (closeDetailsBtn) {
      closeDetailsBtn.addEventListener("click", btnClickHandler);
    }
  }
  
  return (
    <div>
      {addClick && <EnterDetails />}
      <h1 className="text-center py-4 font-semibold w-full text-xl uppercase">
        Slots
      </h1>
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        {slotNumbersArray.map((slotNum) => {
          const matchingItem = data.find(
            (item) => item && parseInt(item.slotNumber) === slotNum
          );

          return (
            <div className="border px-4 py-2 h-fit" key={slotNum}>
              {matchingItem ? (
                <>
                  <p>Slot {matchingItem.slotNumber}</p>
                  <p>{matchingItem.name}</p>
                  <p>{matchingItem.regNumber}</p>
                  <p>{matchingItem.color}</p>
                  <p>{matchingItem.vehicle}</p>
                </>
              ) : (
                <button
                  className="add-btn px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                  onClick={() => onClickAdd(slotNum)}
                >
                  Add Vehicle
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Slots;
