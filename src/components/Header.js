import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../features/UserSlices";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import EnterDetails from "./EnterDetails";
const Header = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();
  const onChangeSearch = (e) => {
    e.preventDefault();
    let searchText = e.target.value;
    if (e.target.value !== "" && e.key !== "Enter") {
      dispatch(searchUser(searchText));
    }
    if (e.target.value === "") {
      dispatch(searchUser(searchText));
    }
  };
  const onClickAdd = () => {
    setOpenAdd(true);
    setClickSearch(false);
    dispatch(searchUser(""));
    if (openAdd) {
      document.querySelector(".add-details").style.display = "block";
    }
  };
  return (
    <div className="fixed w-full flex bg-gradient-to-r from-purple-800 to-blue-350 shadow-md">
      <div className="flex flex-1 p-3 ">
        <img
          src={process.env.PUBLIC_URL + "./images/logo.png"}
          className="px-2 h-full w-14"
          alt=""
        />
      </div>
      <div className="flex items-center gap-2 md:gap-4 justify-end w-1/5 pr-5 md:pr-10">
        {!clickSearch && (
          <button
            onClick={() => {
              setClickSearch(true);
              setOpenAdd(false);
            }}
          >
            <SearchIcon style={{ color: "#FFFFFF" }} />
          </button>
        )}
        {clickSearch && (
          <div className="flex rounded-lg border border-white">
            <input
              type="search"
              className=" bg-transparent h-1/2 focus:outline-none text-white px-4 rounded-lg w-60 md:w-80 placeholder:text-sm placeholder:text-white py-2"
              placeholder="Search"
              onChange={(e) => onChangeSearch(e)}
            />
          </div>
        )}
        <button id="add-btn" onClick={onClickAdd}>
          <AddIcon style={{ color: "#FFFFFF" }} />
        </button>
        {openAdd && <EnterDetails />}
      </div>
    </div>
  );
};

export default Header;
