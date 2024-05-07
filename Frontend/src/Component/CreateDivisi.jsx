import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
export default function CreateDivisi() {
const [name, setName] = useState("");
const {createDivisi} = useAuth()


const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {
    name: name,
  };
  try {
    await createDivisi(data);
    window.location.href = "/admin/division";
  } catch (error) {
    console.error("Failed to create division:", error.message);
  }
};


  
  return (
    <>
      <div className="body-form">
        <h1>Create Division</h1>
        <div className="container-form">
          <form action="#" method="post" onSubmit={handleSubmit}>
            <div className="form-grb">
              <h5>Division Name</h5>
              <input
                type="text"
                placeholder="Division Name"
                 value={name}
                  onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="btn-class-action">
              <Link to="/admin/division" className="nav-link">
                <button className="btn-create btn-back">Back</button>
              </Link>
              <button type="submit" className="btn-create">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
