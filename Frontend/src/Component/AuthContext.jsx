import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [classs, setClass] = useState("");
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState(null);
  const [del, setDel] = useState(false);

  const endpoint = "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("roleId");
    if (role == 1) {
      getProfile(token);
    } else {
      getProfile(token);
      getEmployee(token);
    }
  }, [del]);

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
        localStorage.setItem("roleId", user.roleId);

        await getProfile(token);
        // await getEmployee(token);
        if (user.roleId === 2) {
          await getEmployee(token);
        }
        setClass(user.roleId === 1 ? "employe" : "");
        return response.data;
      }
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const getEmployee = async (token) => {
    try {
      const response = await axios.get(`${endpoint}/employee`, {
        headers: {
          Authorization: token,
        },
      });

      setEmployee(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const getProfile = async (token) => {
    try {
      const response = await axios.get(`${endpoint}/profile`, {
        headers: {
          Authorization: token,
        },
      });

      setProfile(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const createEmploy = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${endpoint}/employee`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const deleteEmploye = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`${endpoint}/employee/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setDel(true)
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const getEmployeeById = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${endpoint}/employee/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const updateEmploye = async (id, data) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(`${endpoint}/employee/${id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };
  
  const updateProfile = async (id, data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`${endpoint}/profile/${id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

  const createDivisi = async (data) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${endpoint}/createDivision`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("there is an error:", error);
      throw error;
    }
  };

const updateDivisi = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(`${endpoint}/division/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("there is an error:", error);
    throw error;
  }
};

const deleteDivisi = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${endpoint}/division/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("there is an error:", error);
    throw error;
  }
};
  

const getDivisi = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${endpoint}/division`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("there is an error:", error);
    throw error;
  }
};

const getDivisiById = async(id) =>{
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${endpoint}/division/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("there is an error:", error);
    throw error;
  }
}

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("roleId");
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
    deleteEmploye,
    getEmployeeById,
    updateEmploye,
    updateProfile,
    createDivisi,
    updateDivisi,
    deleteDivisi,
    getDivisi,
    getDivisiById 
  };

  return <AuthContext.Provider value={Values}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
