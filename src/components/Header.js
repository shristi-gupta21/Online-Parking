import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../features/UserSlices";
import "./Header.css";
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
    <div className="header flexRow">
      <div className="flexMinWidthRow pdngSM ">
        <img
          src={process.env.PUBLIC_URL + "./images/logo.png"}
          className="pdngHSM"
          alt=""
        />
        <span className="flexRow alignEnd bold600">OnLine-Parking-Lot</span>
      </div>
      <div className="flexAuto alignCntr searchbarDiv pdngHMD">
        <div className="search-div">
          <input
            type="search"
            className="search-bar"
            placeholder="Search for Registration number"
            onChange={(e) => onChangeSearch(e)}
          />
          <div className="searchBtn">Search</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
