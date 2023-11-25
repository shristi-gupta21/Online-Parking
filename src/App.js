import Body from "./components/Body";
import EnterDetails from "./components/EnterDetails";
import GenerateSlot from "./components/GenerateSlot";
import Header from "./components/Header";

function App() {
  return (
    <div className="baseBlockCntnr">
      <Header />
      <div className="flex">
        <div className="flex flex-col sideBar">
          <div className="flexMinWidthCol ">
            <EnterDetails />
          </div>
          <div className="flexMinWidthCol">
            <GenerateSlot />
          </div>
        </div>
        <Body />
      </div>
    </div>
  );
}

export default App;
