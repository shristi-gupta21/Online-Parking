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
      <div className="flex gap-2 flex-wrap justify-center ">
        {slotNumbersArray.map((slotNum) => (
          <div
            key={slotNum}
            onClick={onShowDetails}
            className="border p-3 h-fit text-center"
          >
            {userData.length < 1
              ? "Slots are Empty"
              : userData.map((item) =>
                  parseInt(item.slotNumber) === slotNum ? (
                    <div >
                      <p>{item.slotNumber}</p>
                      <p>{item.name}</p>
                      <p>{item.regNumber}</p>
                      <p>{item.vehicle}</p>
                      <div className="flex gap-4">
                        <button>Remove</button>
                        <button>Update</button>
                      </div>
                    </div>
                  ) : (
                    "Empty"
                  )
                )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Slots;
