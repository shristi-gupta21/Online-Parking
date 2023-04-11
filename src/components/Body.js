import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUser,
  SearchUsers,
  updateUser,
  UpdateUsers,
  UserData,
} from "../features/UserSlices";
import "./Body.css";
import { useEffect } from "react";
import { RiEBike2Fill, RiEBike2Line } from "react-icons/ri";
import {
  AiFillCar,
  AiOutlineCar,
  AiOutlineDelete,
  AiOutlineForm,
} from "react-icons/ai";
import { addSlot, SelectedSlot } from "../features/GenerateSlices";

const Body = () => {
  const userData = useSelector(UserData);
  const slotsData = useSelector(SelectedSlot);
  const searchedData = useSelector(SearchUsers);
  const [searchObj, setSearchObj] = useState();
  const dispatch = useDispatch();
  const updateUserData = useSelector(UpdateUsers);

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

  const onClickUpdateeData = (i) => {
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
    <div className="flexCol body">
      <table>
        <tr>
          <th>SL_Name</th>
          <th>Owner_Name</th>
          <th>Registration_Number</th>
          <th>Car/Bike Colour</th>
          <th>Remove/Update</th>
        </tr>
        {searchObj && searchObj["fetch"]
          ? searchObj["obj"].map((item, index) => (
              <tr>
                <td>{item.slotNumber}</td>
                <td>{item.name}</td>
                <td>{item.regNumber.toUpperCase()}</td>
                <td>
                  {item.vehicle}
                  {item.vehicle === "Bike" ? (
                    item.color === "white" ? (
                      <RiEBike2Line />
                    ) : (
                      <RiEBike2Fill color={item.color} />
                    )
                  ) : item.color === "white" ? (
                    <AiOutlineCar />
                  ) : (
                    <AiFillCar color={item.color} />
                  )}
                </td>
                <td>
                  <AiOutlineDelete
                    className="pointer"
                    onClick={() => onClickRemoveData(index)}
                  />
                  /
                  <AiOutlineForm
                    className="pointer"
                    onClick={() => onClickUpdateeData(index)}
                  />
                </td>
              </tr>
            ))
          : userData?.map((item, index) => (
              <tr>
                <td>{item.slotNumber}</td>
                <td>{item.name}</td>
                <td>{item.regNumber.toUpperCase()}</td>
                <td>
                  {item.vehicle}
                  {item.vehicle === "Bike" ? (
                    item.color === "white" ? (
                      <RiEBike2Line />
                    ) : (
                      <RiEBike2Fill color={item.color} />
                    )
                  ) : item.color === "white" ? (
                    <AiOutlineCar />
                  ) : (
                    <AiFillCar color={item.color} />
                  )}
                </td>
                <td>
                  <AiOutlineDelete
                    className="pointer"
                    onClick={() => onClickRemoveData(index)}
                  />
                  /
                  <AiOutlineForm
                    className="pointer"
                    onClick={() => onClickUpdateeData(index)}
                  />
                </td>
              </tr>
            ))}
      </table>
    </div>
  );
};

export default Body;
