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
    dispatch(removeUser({ index: i }));
    updateUserData !== null && dispatch(updateUser({ index: null }));
    dispatch(addSlot({ slots: slotsData.slots + 1 }));
    const modifiedData = data.filter((item, index) => i !== index);
    setData(modifiedData);
  };

  const onClickUpdateData = (i) => {
    const foundObj = userData.find(
      (item) => item.slotNumber === data[i].slotNumber
    );
    const index = foundObj ? userData.indexOf(foundObj) : -1;
    console.log(index);
    setAddClick(true);
    document.querySelector(".add-details").style.display = "";
    dispatch(updateUser({ index: index }));
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
      document
        .querySelector(`.${buttonClass}`)
        .removeEventListener("click", btnClickHandler);
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
  console.log(searchObj);
  return (
    <div>
      {addClick && <EnterDetails />}
      <h1 className="text-center py-4 font-semibold w-full text-2xl uppercase underline">
        Slots
      </h1>
      <div className="flex flex-col md:flex-row gap-2 md:pt-4 flex-wrap items-center justify-center md:justify-start">
        {slotNumbersArray.map((slotNum, i) => {
          const matchingItem = data.find(
            (item) => item && parseInt(item.slotNumber) === slotNum
          );

          return searchObj && searchObj["fetch"] ? (
            searchObj["obj"].map((item) => (
              <div
                className={`px-4 py-2 h-fit ${
                  matchingItem ? "w-80 border" : "w-fit"
                }`}
                key={slotNum}
              >
                <div className="flex justify-between">
                  <div className="w-11/12">
                    <p className="text-center font-bold text-lg">
                      Slot {item.slotNumber + " searched"}
                    </p>
                    <p>{item.name}</p>
                    <p>{item.regNumber}</p>
                    <p>{item.color}</p>
                    <p>{item.vehicle}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="text-red-500"
                      onClick={() => onClickRemoveData(i)}
                    >
                      <RemoveCircleIcon />
                    </button>
                    <button onClick={() => onClickUpdateData(i)}>
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`px-4 py-2 h-fit ${
                matchingItem ? "w-80 border" : "w-fit"
              }`}
              key={slotNum}
            >
              {matchingItem ? (
                <div className="flex justify-between">
                  <div className="w-11/12">
                    <p className="text-center font-bold text-lg">
                      Slot {matchingItem.slotNumber + " matched"}
                    </p>
                    <p>{matchingItem.name}</p>
                    <p>{matchingItem.regNumber}</p>
                    <p>{matchingItem.color}</p>
                    <p>{matchingItem.vehicle}</p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="text-red-500"
                      onClick={() => onClickRemoveData(i)}
                    >
                      <RemoveCircleIcon />
                    </button>
                    <button onClick={() => onClickUpdateData(i)}>
                      <EditIcon />
                    </button>
                  </div>
                </div>
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
