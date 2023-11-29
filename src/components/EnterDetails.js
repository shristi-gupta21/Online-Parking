import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSlot, SelectedSlot, TotalSlots } from "../features/GenerateSlices";
import "../index.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  addNewUpdatedData,
  addUser,
  updateUser,
  UpdateUsers,
  UserData,
} from "../features/UserSlices";
import { v1 } from "uuid";

const EnterDetails = () => {
  const updateUserData = useSelector(UpdateUsers);
  const totalSlots = useSelector(TotalSlots);
  const [data, setData] = useState({
    name: "",
    regNumber: "",
    color: "",
    slotNumber: 0,
    vehicle: "",
  });
  const [valid, setValid] = useState();
  const dispatch = useDispatch();
  const userData = useSelector(UserData);
  const slotData = useSelector(SelectedSlot);
  // console.log("updateUserData.length", updateUserData);
  useEffect(() => {
    if (updateUserData !== null) {
      console.log("updateUserData", updateUserData);
      setData({
        name: userData[updateUserData]?.name,
        regNumber: userData[updateUserData]?.regNumber,
        color: userData[updateUserData]?.color,
        slotNumber: userData[updateUserData]?.slotNumber,
        vehicle: userData[updateUserData]?.vehicle,
        id: userData[updateUserData]?.id,
      });
    } else {
      setData({
        name: "",
        regNumber: "",
        color: "",
        slotNumber: "",
        vehicle: "",
      });
    }
  }, [updateUserData]);

  const onChangeData = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const checkRegistrationNumber = (reg) => {
    const obj = userData?.filter((item) => item.regNumber === reg);
    if (obj?.length !== 0) {
      return false;
    }
    return true;
  };

  const checkSlotNumber = (slot) => {
    const obj = userData?.filter((item) => item.slotNumber === slot);
    // console.log("obj", obj);
    if (obj?.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const isSlotBetweenGivenSlot = (slot) => {
    const isSlot = parseInt(slot) <= parseInt(totalSlots);
    if (isSlot) {
      return true;
    }
    return false;
  };

  const isSlotBetweenLess = (slot) => {
    const isSlot = parseInt(slot) > 0;
    if (isSlot) {
      return true;
    }
    return false;
  };

  const validation = () => {
    let errorObj = {};
    if (data.name === "") {
      errorObj["name"] = "Enter name";
    }
    if (data.regNumber === "") {
      errorObj["regNumber"] = "Enter Registration Number";
    }
    if (data.color === "") {
      errorObj["color"] = "Enter color";
    }
    if (data.slotNumber === 0) {
      errorObj["slotNumber"] = "Enter Slot Number other than 0";
    }
    if (data.slotNumber === "") {
      errorObj["slotNumber"] = "Enter Slot Number ";
    }
    if (data.vehicle === "") {
      errorObj["vehicle"] = "Choose vehicle";
    }
    if (slotData === null) {
      errorObj["submit"] = "Please generate slot ";
    }
    setValid(errorObj);
    if (
      data.name !== "" &&
      data.regNumber !== "" &&
      data.color !== "" &&
      data.slotNumber !== ""
    ) {
      const regexName = /^[a-zA-Z\s]{4,29}$/;
      const regexReg =
        /^[a-zA-Z]{2}[-]{1}[0-9]{2}[-]{1}[a-zA-Z]{2}[-][0-9]{4}$/gi;
      const regexColor = /^[A-Za-z]+$/;
      const regexSlotNumber = /^[1-9][0-9]*$/;
      if (!regexName.test(data.name)) {
        errorObj["name"] = "Enter name of length 4 to 29";
      }
      if (data.regNumber.match(regexReg) === null) {
        errorObj["regNumber"] = "Enter in specific format only";
      }
      if (!checkRegistrationNumber(data.regNumber) && updateUserData === null) {
        errorObj["regNumber"] = "Registration Number already in use";
      }
      if (!regexColor.test(data?.color?.toLowerCase())) {
        errorObj["color"] = "Enter alphabets only";
      }
      if (!regexSlotNumber.test(data.slotNumber)) {
        errorObj["slotNumber"] = "Enter valid number";
      } else if (parseInt(data.slotNumber) > 0) {
        if (data.slotNumber > parseInt(totalSlots)) {
          errorObj["slotNumber"] = "Enter number lesser than total Slot Number";
        } else if (!isSlotBetweenGivenSlot(data.slotNumber)) {
          errorObj["slotNumber"] = "";
        } else if (!isSlotBetweenLess(data.slotNumber)) {
          errorObj["slotNumber"] = "Enter number greater than 0";
        } else if (
          !checkSlotNumber(data.slotNumber) &&
          updateUserData === null
        ) {
          errorObj["slotNumber"] = "Same slot number has already been entered";
        }
      } else if (data.slotNumber <= 0) {
        errorObj["slotNumber"] = "Enter slot number greater than 0";
      }
      if (data.vehicle === "") {
        errorObj["vehicle"] = "Choose a vehicle";
      }
      if (
        (slotData.slot <= 0 || slotData === null) &&
        updateUserData === null
      ) {
        dispatch(addSlot({ slots: slotData.slots }));
      }
      setValid(errorObj);
    }
    return Object.keys(errorObj).length === 0;
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    if (
      slotData !== null &&
      slotData.slots >= 0 &&
      updateUserData === null &&
      validation()
    ) {
      const body = {
        name: data.name,
        regNumber: data.regNumber,
        color: data.color,
        slotNumber: data.slotNumber,
        vehicle: data.vehicle,
        id: v1(),
      };
      dispatch(addUser(body));
      dispatch(addSlot({ slots: slotData.slots - 1 }));
      setData({
        name: "",
        regNumber: "",
        color: "",
        slotNumber: "",
        vehicle: "",
      });
    } else if (slotData === null) {
      alert("Generate Slot");
    }
  };

  const update = (e) => {
    e.preventDefault();
    if (
      validation() &&
      updateUserData !== null &&
      isSlotBetweenGivenSlot(data.slotNumber) &&
      isSlotBetweenLess(data.slotNumber)
    ) {
      if (updateUserData >= 0 && userData.length !== 1) {
        const object = userData.filter(
          (item) => item.id !== userData[updateUserData]?.id
        );
        console.log(object);
        const isSlotAvailable = object.filter(
          (item) =>
            item.slotNumber === data.slotNumber ||
            item.regNumber === data.regNumber
        );
        if (isSlotAvailable.length === 0) {
          const newArray = [...userData];
          newArray[updateUserData] = {
            ...newArray[updateUserData],
            ...data,
          };
          dispatch(addNewUpdatedData(newArray));
          setData({
            name: "",
            regNumber: "",
            color: "",
            slotNumber: "",
            vehicle: "",
          });
          dispatch(updateUser({ index: null }));
        } else {
          const object = userData.filter(
            (item) => item.id !== userData[updateUserData]?.id
          );
          console.log(object);
          const isSlotAvailable = object.filter(
            (item) => item.slotNumber === data.slotNumber
          );
          if (isSlotAvailable.length !== 0) {
            setValid((prevState) => ({
              ...prevState.valid,
              slotNumber: "Already exist",
            }));
          }
          const isSlotAvailable2 = object.filter(
            (item) => item.regNumber === data.regNumber
          );

          if (isSlotAvailable2.length !== 0) {
            setValid((prevState) => ({
              ...prevState.valid,
              regNumber: "Already exist",
            }));
          }
        }
      } else if (updateUserData === 0 && userData.length === 1) {
        const newArray = [...userData];
        newArray[updateUserData] = {
          ...newArray[updateUserData],
          ...data,
        };
        dispatch(addNewUpdatedData(newArray));
        setData({
          name: "",
          regNumber: "",
          color: "",
          slotNumber: "",
          vehicle: "",
        });
        dispatch(updateUser({ index: null }));
      }
    }
  };

  const close = () =>{
    document.querySelector(".add-details").style.display = "none";
  }
  return (
    <div className="z-10 add-details top-12 absolute translate-x-1/2 right-1/2 md:right-6 bg-blue-300 shadow-md rounded-xl">
      <form
        action=""
        onSubmit={(e) =>
          updateUserData === null ? onSubmitData(e) : update(e)
        }
        className="flex p-4 items-start"
      >
        <div  className="flex flex-col gap-3 md:gap-5 items-center">
          {updateUserData === null ? (
            <p className="font-semibold uppercase md:text-xl md:pb-4 underline">
              Add Details
            </p>
          ) : (
            <p className="font-semibold uppercase md:text-xl md:pb-4 underline">
              Update Details
            </p>
          )}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                id="name"
                placeholder="Owner name"
                onChange={(e) => onChangeData(e)}
                value={data.name}
                className=" border-b placeholder:text-gray-700 placeholder:text-sm"
              />
              <div className="md:px-5 tooltip ">
                <span className=" font-semibold text-gray-600">&#x24d8;</span>
                <span className="tooltiptext">Includes alphabets</span>
              </div>
            </div>

            {valid && (
              <p
                className={
                  valid?.name === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["name"]}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              id="regNumber"
              placeholder="Registration number"
              onChange={(e) => onChangeData(e)}
              value={data.regNumber}
              className=" border-b placeholder:text-gray-700 placeholder:text-sm"
            />
            <div className="md:px-5 tooltip">
              <span className="font-semibold text-gray-600">&#x24d8;</span>
              <span className="tooltiptext">
                Registration number should be in the specific format e.g.
                UP80-DL-0987
              </span>
            </div>
            {valid && (
              <p
                className={
                  valid?.regNumber === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["regNumber"]}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Car/Bike color"
              id="color"
              onChange={(e) => onChangeData(e)}
              value={data.color}
              className=" border-b placeholder:text-gray-700 placeholder:text-sm"
            />
            <div className="md:px-5 tooltip ">
              <span className="font-semibold text-gray-600">&#x24d8;</span>
              <span className="tooltiptext px-2">Enter valid color</span>
            </div>
            {valid && (
              <p
                className={
                  valid?.color === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["color"]}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              id="slotNumber"
              placeholder="Slot number"
              onChange={(e) => onChangeData(e)}
              value={data.slotNumber}
              className=" border-b placeholder:text-gray-700 placeholder:text-sm"
            />
            <div className="md:px-5 tooltip">
              <span className="font-semibold text-gray-600">&#x24d8;</span>
              <span className="tooltiptext">Enter any number</span>
            </div>
            {valid && (
              <p
                className={
                  valid?.slotNumber === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["slotNumber"]}
              </p>
            )}
          </div>
          <div className="w-1/2">
            <div className="flex justify-around">
              <div>
                <input
                  type="radio"
                  id="vehicle"
                  name="vehicle"
                  value="Car"
                  onChange={(e) => onChangeData(e)}
                  checked={data.vehicle === "Car"}
                  className=" scale-105"
                />
                <label className="px-2 uppercase">Car</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="vehicle"
                  name="vehicle"
                  value="Bike"
                  onChange={(e) => onChangeData(e)}
                  checked={data.vehicle === "Bike"}
                  className=" scale-105"
                />
                <label className="px-2 uppercase">Bike</label>
              </div>
            </div>
            {valid && (
              <p
                className={
                  valid?.vehicle === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["vehicle"]}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="py-1 disabled:bg-red-500 px-10 md:text-lg rounded-md text-white uppercase font-semibold bg-gradient-to-r from-purple-800 to-blue-350"
            >
              {updateUserData === null ? "Add" : "Update"}
            </button>
            {valid && (
              <p
                className={
                  valid?.submit === "" ? "hidden" : "text-red-500 text-xs"
                }
              >
                {valid["submit"]}
              </p>
            )}
          </div>
        </div>
        <button type="button" onClick={close} className="close-btn">
          <CloseIcon />
        </button>
      </form>
    </div>
  );
};

export default EnterDetails;
