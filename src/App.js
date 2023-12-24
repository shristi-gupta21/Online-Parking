import Header from "./components/Header";
import SideNavRouter from "./components/SideNavRouter";
import SideNav from "./components/SideNav";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    } 
  }, []);

  return (
    <div>
      <Header />
      <div className="md:flex gap-16 w-full px-4 md:px-0 pt-16">
        <SideNav />
        <SideNavRouter />
      </div>
    </div>
  );
}

export default App;
