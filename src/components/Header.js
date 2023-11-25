import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../features/UserSlices";
const Header = () => {
  const dispatch = useDispatch();
  // const userData = useSelector(UserData)

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
    <div className=" flex bg-yellow-600">
      <div className="flex flex-1 p-3 ">
        <img
          src={process.env.PUBLIC_URL + "./images/logo.png"}
          className="px-2 h-full w-14"
          alt=""
        />
        <span className="flex items-end font-semibold">OnLine-Parking-Lot</span>
      </div>
      <div className="flex items-center w-1/5 px-4">
        <div className="flex rounded-lg border border-gray-500">
          <input
            type="search"
            className=" bg-transparent h-1/2 rounded-lg w-80"
            placeholder="Search for Registration number"
            onChange={(e) => onChangeSearch(e)}
          />
          <div >Search</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
