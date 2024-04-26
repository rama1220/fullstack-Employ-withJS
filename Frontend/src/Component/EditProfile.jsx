import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const { getProfile, updateProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const profile = await getProfile(token);
        if (profile) {
          setId(profile?.user.employee[0].id);
          setName(profile?.user.name);
          setEmail(profile?.user.email);
          setPassword(profile?.user.password);
          setAddress(profile?.user.employee[0].address);
          setPhone(profile?.user.employee[0].phone);
        }
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      address: address,
      phone: phone,
    };
    try {
      await updateProfile(userId, data);
      window.location.href = "/admin/profile";
    } catch (error) {
      console.error("Failed to create employe:", error.message);
    }
  };

  return (
    <div className="body-form">
      <h1>Edit Profile</h1>
      <div className="container-form">
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="form-grb">
            <h5>Name</h5>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-grb">
            <h5>Email</h5>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-grb">
            <h5>Password</h5>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-grb">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-grb">
            <h5>Phone</h5>
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="btn-class-action">
            <Link to="/admin/profile" className="nav-link">
              <button className="btn-create btn-back">Back</button>
            </Link>
            <button type="submit" className="btn-create">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
