import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Component/Login";
import AdminPage from "./Component/AdminPage";
import DashoardMenu from "./Component/DashoardMenu";
import Profile from "./Component/Profile";
import Employe from "./Component/Employee";
import CreateEmploye from "./Component/CreateEmploye";
import EditEmployee from "./Component/EditEmployee";
import EditProfile from "./Component/EditProfile";
import SearchResult from "./Component/SearchResult";
import Division from "./Component/Division";
import CreateDivisi from "./Component/CreateDivisi";
import EditDivisi from "./Component/EditDivisi";
import Divisionemployee from "./Component/Divisionemployee";

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
    children: [
      {
        path: "",
        Component: DashoardMenu,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            Component: Profile,
          },
          {
            path: "editprofile/:id",
            Component: EditProfile,
          },
        ],
      },
      {
        path: "employee",
        children: [
          {
            path: "",
            Component: Employe,
          },
          {
            path: "create",
            Component: CreateEmploye,
          },
          {
            path: "edit/:id",
            Component: EditEmployee,
          },
          {
            path: "search",
            Component: SearchResult,
          },
        ],
      },
      {
        path: "division",
        children: [
          {
            path: "",
            Component: Division,
          },
          {
            path: "createdivision",
            Component: CreateDivisi,
          },
          {
            path: "editdivision/:id",
            Component: EditDivisi,
          },
          {
            path: "divisionemployee/:id",
            Component: Divisionemployee,
          },
        ],
      },
    ],
  },
]);
export default Router;
