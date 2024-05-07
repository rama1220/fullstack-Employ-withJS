import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function CreateEmployee() {
  const { createEmploy, getDivisi } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [born, setBorn] = useState("");
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
const idDivisi =  parseInt(selectedDivision);

// console.log(selectedDivision)


  useEffect(() => {
    getDivisi()
      .then((data) => {
        setDivision(data);
      })
      .catch((error) => {
        console.error("Failed to fetch division data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      address: address,
      phone: phone,
      born_at: born,
      divisionId: idDivisi, 
    };
    try {
      await createEmploy(data);
      window.location.href = "/admin/employee";
    } catch (error) {
      console.error("Failed to create employee:", error.message);
    }
  };

  return (
    <div className="body-form">
      <h1>Create Employee</h1>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grb">
            <h5>Name</h5>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-grb">
            <h5>Date of Birth</h5>
            <input
              type="date"
              placeholder="Born"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
              required
            />
          </div>
          <div className="form-grb">
            <h5>Division</h5>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              required
            >
              <option value="">Select Division</option>
              {division?.divisions?.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-grb">
            <h5>Email</h5>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-grb">
            <h5>Password</h5>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-grb">
            <h5>Address</h5>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-grb">
            <h5>Phone</h5>
            <input
              type="number"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="btn-class-action">
            <Link to="/admin/employee" className="nav-link">
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
