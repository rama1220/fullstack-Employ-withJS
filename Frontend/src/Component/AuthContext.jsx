import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [classs, setclass] = useState("");
  const [employee, setemployee] = useState([]);
  const [profile, setprofile] = useState(null);

  const endpoint = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token);
      getEmployee(token);
    }
  }, []);
  const Login = async (email, password) => {
    try {
      const response = await axios.post(`${endpoint}/login`, {
        email: email,
        password: password,
      });

      const { token, user } = response.data;
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user.name);
        // console.log(response.data);
        await getProfile(token);
        await getEmployee(token);
        if (user.roleId === 1) {
          setclass("employe");
        } else if (user.roleId === 2) {
          setclass("");
        }

        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const getEmployee = async (token) => {
    try {
      const response = await axios.get(`${endpoint}/employee`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setemployee(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("invalid token");
      } else {
        console.error("there is an error:", error);
      }
    }
  };

  const getProfile = async (token) => {
    if (token) {
      try {
        const response = await axios.get(`${endpoint}/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        setprofile(response.data);
        return response.data;
      } catch (error) {
        console.error("there is an error:", error);
      }
    }
  };

  const createEmploy = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${endpoint}/employee`, data, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("invalid token");
      } else {
        console.error("there is an error:", error);
      }
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const Values = {
    Login,
    Logout,
    getEmployee,
    getProfile,
    classs,
    employee,
    profile,
    createEmploy,
  };

  return <AuthContext.Provider value={Values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
