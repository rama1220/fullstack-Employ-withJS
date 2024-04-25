import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function CreateEmploye() {
const { createEmploy } = useAuth();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [address, setAddress] = useState("");
const [phone, setPhone] = useState("");


const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone
      };
    try {
        await createEmploy(data);
        window.location.href = "/admin/employee";
    } catch (error) {
        console.error("Failed to create employe:", error.message);
    }
};

  return (
    <div className="body-form">
      <h1>create employe</h1>
      <div className="container-form">
        <form action="#" method="post" onSubmit={handleSubmit}>
          <div className="form-grb">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-grb">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-grb">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="form-grb">
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div className="form-grb">
            <input type="number" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <button type="submit" className="btn-create">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
