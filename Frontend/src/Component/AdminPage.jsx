import SidebarPage from "./SidebarPage";
import { Outlet } from "react-router-dom";
import Logo from "../assets/image/logo.png";

export default function AdminPage() {
  return (
    <div>
      <div className="container">
        <nav>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
        </nav>
        <div className="admin-content">
          <div className="sidebar">
            <SidebarPage />
          </div>

          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
