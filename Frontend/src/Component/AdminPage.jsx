import SidebarPage from "./SidebarPage";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div>
      <div className="container">
        <nav></nav>
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
