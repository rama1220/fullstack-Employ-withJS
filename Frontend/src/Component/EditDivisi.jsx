import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

export default function EditDivisi() {
  const { id } = useParams();
  const { getDivisiById, updateDivisi } = useAuth();
  const [divisionName, setDivisionName] = useState("");
  console.log(divisionName?.division?.name);

  useEffect(() => {
    const fetchDivisi = async () => {
      try {
        const division = await getDivisiById(id);
        if (division) {
         
          setDivisionName(division);
        } else {
          console.log("Division not found");
        }
      } catch (error) {
        console.error("Error fetching division:", error);
      }
    };

    fetchDivisi();
  }, [id, getDivisiById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDivisi(id, { name: divisionName });
      window.location.href = "/admin/division";
    } catch (error) {
      console.error("Error updating division:", error);
    }
  };

  return (
    <>
      <div className="body-form">
        <h1>Update Division</h1>
        <div className="container-form">
          <form onSubmit={handleSubmit}>
            <div className="form-grb">
              <h5>Division Name</h5>
              <input
                type="text"
                placeholder="Division Name"
                value={divisionName?.division?.name}
                onChange={(e) => setDivisionName(e.target.value)}
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
