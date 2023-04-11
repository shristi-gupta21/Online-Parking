import Body from "./components/Body";
import EnterDetails from "./components/EnterDetails";
import Footer from "./components/Footer";
import GenerateSlot from "./components/GenerateSlot";
import Header from "./components/Header";

function App() {
  return (
    <div className="baseBlockCntnr">
      <Header />
      <div className="flexRow">
        <div className="flexCol sideBar">
          <div className="flexMinWidthCol ">
            <EnterDetails />
          </div>
          <div className="flexMinWidthCol">
            <GenerateSlot />
          </div>
        </div>
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
