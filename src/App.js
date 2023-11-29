import Header from "./components/Header";
import SideNavRouter from "./components/SideNavRouter";
import SideNav from "./components/SideNav";

function App() {
  return (
    <div>
      <Header />
      <div className="md:flex gap-16 w-full px-4 md:px-0">
        <SideNav />
        <SideNavRouter />
      </div>
    </div>
  );
}

export default App;
