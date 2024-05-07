import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Divisionemployee() {
  const [divisionName, setDivisionName] = useState("");
  const [employees, setEmployees] = useState([]);

  console.log("ini hasil", employees)

  const { id } = useParams();
  const { getDivisiById } = useAuth();

  useEffect(() => {
    const fetchDivisi = async () => {
      try {
        const division = await getDivisiById(id);
        if (division) {
          setDivisionName(division);
          setEmployees(division); // Assuming division object contains employees array
        } else {
          console.log("Division not found");
        }
      } catch (error) {
        console.error("Error fetching division:", error);
      }
    };

    fetchDivisi();
  }, [id, getDivisiById]);

  return (
    <>
      <div className="container-division">
      <h1>{divisionName.division?.name}</h1>
        <div className="class-table-division">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Birthdate</th>
              </tr>
            </thead>
            <tbody>
               {employees?.division?.employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.user.name}</td>
              <td>{employee.user.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.address}</td>
              <td>{employee.born_at}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
