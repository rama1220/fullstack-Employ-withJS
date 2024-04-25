import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Component/Login";
import AdminPage from "./Component/AdminPage";
import DashoardMenu from "./Component/DashoardMenu";
import Profile from "./Component/Profile";
import Employe from "./Component/Employe";
import CreateEmploye from "./Component/CreateEmploye";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminPage,
    children : [{
      path: "",
      Component: DashoardMenu
    },{
      path: "profile",
      Component: Profile
    },{
      path: "employee",
      children : [{
        path: "",
        Component: Employe
      },{
        path: "create",
        Component: CreateEmploye
      }]
    }]
  },
]);
export default Router;
