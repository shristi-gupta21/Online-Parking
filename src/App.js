import GenerateSlot from "./components/GenerateSlot";
import Header from "./components/Header";
import SideNavRouter from "./components/SideNavRouter";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div className="">
      <Header/>
      <div className="flex">
        <div className="flex flex-col">
          <div className="h-full">
            <SideNav />
          </div>
          <div className="">
            <GenerateSlot />
          </div>
        </div>
        <SideNavRouter/>
      </div>
    </div>
  );
}

export default App;
