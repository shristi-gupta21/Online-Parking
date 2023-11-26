import Header from "./components/Header";
import SideNavRouter from "./components/SideNavRouter";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <SideNav />
        <SideNavRouter />
      </div>
    </div>
  );
}

export default App;
