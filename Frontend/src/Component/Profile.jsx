import Icon from "../assets/image/icon.jpg";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
export default function Profile() {
  const { profile } = useAuth();
  console.log(profile);
  const id = profile?.user.id;

  return (
    <div className="profile">
      <div className="image-profile">
        <img src={Icon} alt="" />
        <Link to={`editprofile/${id}`} className="nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </Link>
      </div>
      <h2>Profile</h2>
      <p>Nama : {profile?.user.name}</p>
      <p>Email : {profile?.user.email}</p>
      {profile?.user.employee[0]?.phone?.length > 1 && (
        <p>No.Hp : {profile?.user.employee[0].phone}</p>
      )}
      {profile?.user.employee[0]?.address?.length > 1 && (
        <p>Address : {profile?.user?.employee[0]?.address}</p>
      )}
    </div>
  );
}
