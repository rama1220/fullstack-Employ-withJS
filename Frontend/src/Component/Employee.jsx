import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
// import { FormatDate } from "../CreateAt";
import SearchComponent from "./SearchComponent";
import { Birthday } from "../Birthday";
export default function Employe() {
  const { employee, deleteEmploye } = useAuth();

  const handleDelete = async (id) => {
    try {
      await deleteEmploye(id);
    } catch (error) {
      console.error("Failed to delete employe:", error.message);
    }
  };

  return (
    <div>
      <h2>Employee Data</h2>

      <Link to="create" className="nav-link">
        <button className="btn-create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            <path d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
          </svg>
          Create Employee
        </button>
      </Link>
      <SearchComponent />
      <table className="employee-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Address</th>
            {/* <th>Phone Number</th> */}
            <th>Divisi</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employee?.employ?.map((emp, index) => (
            <tr key={emp.id}>
              <td>{index+1}</td>
              <td>{emp.user?.name}</td>
              <td>{Birthday(emp.born_at)}</td>
              <td>{emp.user?.email}</td>
              <td>{emp.address}</td>
              {/* <td>{emp.phone}</td> */}
              <td>{emp.division?.name}</td>
              <td>
                <div>
                  <Link to={`edit/${emp.id}`} className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </Link>
                </div>
              </td>
              <td>
                <div onClick={() => handleDelete(emp.userId)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="grey"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
