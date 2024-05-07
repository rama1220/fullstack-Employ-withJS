import { useState } from "react"; // Import useState hook
import TextInput from "../TextInput";
import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
export default function SearchComponent() {
  const { getEmployeeById } = useAuth();
  // const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleInput = (e) => {
    const term = e.target.value;
    setSearchInput(term.toLowerCase());
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      performSearch(searchInput.trim());
    }
  };

  const handleClick = () => {
    if (searchInput.trim() !== "") {
      performSearch(searchInput.trim());
    }
  };

  const performSearch = (searchInputValue) => {
    // Pemanggilan fungsi pencarian, yang harus didefinisikan
    getEmployeeById(searchInputValue)
      .then(() => {
        localStorage.setItem("employ", searchInputValue);
        // navigate("search");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="form-input">
        {/* TextInput untuk input pencarian */}
        <TextInput
          required={true}
          label=""
          placeholder="Search your Employee..."
          onChange={handleInput}
          onKeyDown={handleEnterKeyPress} // Menggunakan fungsi yang sesuai
          className="input"
        />
        {/* Tombol untuk memulai pencarian */}
        <button className="btn-Search" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </>
  );
}
