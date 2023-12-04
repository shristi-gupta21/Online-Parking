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
import EnterDetails from './EnterDetails'

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
  const [slotNumbersArr, setSlotNumbersArr] = useState([]);
  const [isPresentSlot, setIsPresentSlot] = useState([]);
  useEffect(() => {
    if (searchedData !== "") {
      showSearchedUser(searchedData);
    } else {
      showSearchedUser(searchedData);
    }
    userData.map((item) =>
      setSlotNumbersArr((prev) => [...prev, item.slotNumber])
    );
    setIsPresentSlot(
      userData.filter((item) => slotNumbersArr.includes(item.slotNumber)),
   );
  }, [searchedData, updateUserData, userData]);
  console.log(isPresentSlot);
  const onClickRemoveData = (i) => {
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
      document.querySelector(".add-details").style.display = "block";
    }
  };
 
  return (
    <div>
      <div>
        {addClick && <EnterDetails/>}
      </div>
      <h1 className="text-center py-4 font-semibold w-full text-xl uppercase">
        Slots
      </h1>
      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
        {slotNumbersArray.map((slotNum) => (
          <div
            key={slotNum}
            onClick={onShowDetails}
            className="border rounded p-3 h-fit"
          >
            {userData.length < 1 ? (
              <button
                className="px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                onClick={onClickAdd}
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
                      {addClick ? (
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
                      ) : (
                        <button
                          className="px-2 py-1 rounded shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                          onClick={onClickAdd}
                        >
                          Add Vehicle
                        </button>
                      )}
                    </div>
                  )
              )
            )}
            {userData.length > 0 &&
              userData.map((item) =>
                isPresentSlot.map(slot => (
                  parseInt(slot.slotNumber) === parseInt(item.slotNumber) ? "":
                  <button
                    className="px-2 rounded py-1 shadow bg-gradient-to-r from-purple-800 to-blue-350 text-white"
                    onClick={onClickAdd}
                  >
                   Add
                  </button>
                )) 
              )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slots;
