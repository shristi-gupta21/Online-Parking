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
    showSearchedUser(searchedData);
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
    setAddClick(true);
    document.querySelector(".add-details").style.display = "";
    dispatch(updateUser({ index: index }));
  };

  const showSearchedUser = (data) => {
    let d = {};
    if (data !== "") {
      const obj = userData.filter(
        (item) =>
          item.regNumber.toLowerCase().includes(data) ||
          item.name.toLowerCase().includes(data) ||
          item.color.toLowerCase().includes(data) ||
          item.vehicle.toLowerCase().includes(data)
      );
      d = { obj: obj, fetch: true };
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
      setAddClick(false);
      const buttonClass = event.currentTarget.classList[0];
      document
        .querySelector(`.${buttonClass}`)
        .removeEventListener("click", btnClickHandler);
    };

    const addDetailsBtn = document.querySelector(".add-details-btn");
    const closeDetailsBtn = document.querySelector(".close-btn");

    if (addDetailsBtn || closeDetailsBtn) {
      addDetailsBtn.addEventListener("click", btnClickHandler);
    }
  }
  return (
    <div className="w-full">
      {addClick && <EnterDetails />}
      <h1 className="text-center py-4 font-semibold w-full text-xl md:text-3xl uppercase underline">
        Slots
      </h1>
      <div className="flex flex-col md:flex-row gap-2 md:pt-4 flex-wrap items-center justify-center md:justify-start">
        {searchObj && searchObj["fetch"] ? (
          searchObj["obj"].length > 0 ? (
            searchObj["obj"].map((item, i) => (
              <div
                className={`px-4 py-2 h-fit w-80 border 
              `}
                key={item.slotNumber}
              >
                {
                  <div className="flex justify-between">
                    <div className="w-11/12">
                      <p className="text-center font-bold text-lg">
                        Slot {item.slotNumber}
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
                }
              </div>
            ))
          ) : (
            <div className="mx-auto flex items-center justify-center h-80 md:h-96 md:w-full text-xl md:text-3xl font-medium text-slate-500">
              No data found ..
            </div>
          )
        ) : (
          slotNumbersArray.map((slotNum, i) => {
            const matchingItem = data.find(
              (item) => item && parseInt(item.slotNumber) === slotNum
            );
            // console.log(slotNumbersArray);
            return (
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
                        Slot {matchingItem.slotNumber}
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
          })
        )}
      </div>
    </div>
  );
};
export default Slots;
