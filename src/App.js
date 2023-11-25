import Body from "./components/Body";
import EnterDetails from "./components/EnterDetails";
import GenerateSlot from "./components/GenerateSlot";
import Header from "./components/Header";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="">
      <Header />
      <div className="flex h-full">
        <div className="flex flex-col h-full">
          <div className="h-full">
            <SideNav />
          </div>
          <div className="">
            <GenerateSlot />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
