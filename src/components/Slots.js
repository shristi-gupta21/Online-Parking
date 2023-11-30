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
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  console.log("userData", userData);
  useEffect(() => {
    if (searchedData !== "") {
      showSearchedUser(searchedData);
    } else {
      showSearchedUser(searchedData);
    }
  }, [searchedData, updateUserData, userData]);

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


  return (
    <div>
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
            {userData.length < 1
              ? "Slot is Empty"
              : userData.map((item) =>
                  parseInt(item.slotNumber) === slotNum ? (
                    <div className="flex  w-full  items-start">
                      <div className="w-4/5">
                        <p>Slot {item.slotNumber}</p>
                        <p>{item.name}</p>
                        <p>{item.regNumber}</p>
                        <p>{item.vehicle}</p>
                      </div>
                      <div className="flex flex-col w-1/5">
                        <button className=" text-red-500">
                          <RemoveCircleIcon />
                        </button>
                        <button className="text-gray-700">
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    "Slot is Empty"
                  )
                )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slots;
