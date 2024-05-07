import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const { getEmployeeById, updateEmploye, getDivisi } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setId] = useState(null);
  const [born, setBorn] = useState("");
  const [division, setDivision] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const idDivisi = parseInt(selectedDivision);
  console.log(idDivisi);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employee = await getEmployeeById(id);
        if (employee) {
          setId(employee?.employee?.userId);
          setName(employee?.employee.user.name);
          setBorn(employee?.employee.born_at);
          setEmail(employee?.employee.user.email);
          setPassword(employee?.employee.user.password);
          setAddress(employee?.employee.address);
          setPhone(employee?.employee.phone);
        }
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchData();
  }, [getEmployeeById, id]);
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
      born_at: born,
      email: email,
      password: password,
      address: address,
      phone: phone,
      divisionId: idDivisi,
    };
    try {
      await updateEmploye(userId, data);
      window.location.href = "/admin/employee";
    } catch (error) {
      console.error("Failed to create employe:", error.message);
    }
  };

  return (
    <div className="body-form">
      <h1>Update employe</h1>
      <div className="container-form">
        <form action="#" method="post" onSubmit={handleSubmit}>
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
