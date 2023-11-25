import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../features/UserSlices";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
const Header = () => {
  const [clickSearch, setClickSearch] = useState(false)
  const dispatch = useDispatch();
  const onChangeSearch = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    if (e.target.value !== "" && e.key !== "Enter") {
      console.log("working");
      let searchText = e.target.value;
      dispatch(searchUser(searchText));
    }
  };
  return (
    <div className="flex bg-slate-100">
      <div className="flex flex-1 p-3 ">
        <img
          src={process.env.PUBLIC_URL + "./images/logo.png"}
          className="px-2 h-full w-14"
          alt=""
        />
      </div>
      <div className="flex items-center gap-4 justify-end w-1/5 pr-10">
        {!clickSearch && <button onClick={()=>setClickSearch(true)}><SearchIcon/></button>}
        {clickSearch && <div className="flex rounded-lg border border-gray-500">
          <input
            type="search"
            className=" bg-transparent h-1/2 rounded-lg w-80 placeholder:text-sm placeholder:px-2.5 py-2"
            placeholder="Search"
            onChange={(e) => onChangeSearch(e)}
          />
        </div>}
        <button> <AddIcon/></button>
      </div>
    </div>
  );
};

export default Header;
