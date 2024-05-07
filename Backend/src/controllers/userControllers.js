import * as userService from "../services/userService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const handleCreateEmploy = async (req, res) => {
  try {
    const { name, email, password, address, phone, born_at, divisionId } = req.body;
    const newUser = await userService.handleCreateEmploy(req.user.id, { name, email, password, address, phone, born_at, divisionId });
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const createAdmin = async (req, res) => {
  try {
    const newUser = await userService.createAdmin(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deletedEmployee = await userService.deleteEmployee(req.user.id, id);
    res.status(200).json({
      message: "Employee deleted successfully",
      user: deletedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const readEmploy = async (req, res) => {
  try {
    const employ = await userService.readEmployee();
    res.status(200).json({
      employ,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getEmployeeById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const employee = await userService.getEmployeById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const id = parseInt(req.params.id);
  const adminId = req.user.id;
  const updatedData = req.body;
  try {
    const updatedEmployee = await userService.updateEmployee(
      adminId,
      id,
      updatedData
    );
    res.status(200).json({
      message: "Employee updated successfully",
      user: updatedEmployee,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const readProfile = async (req, res) => {
  try {
    const user = await userService.readProfile(req.user.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const createDivision = async (req, res) => {
  try {
    // Menggunakan ID pengguna dari permintaan
    const newDivision = await userService.createDivision(req.user.id, req.body);
    res.status(201).json({
      message: "Division created successfully",
      division: newDivision,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateDivision = async (req, res) => {
  try {
    let divisionId = parseInt(req.params.id);
    const updatedDivisionData = req.body;

    const updatedDivision = await userService.updateDivisionById(
      divisionId,
      updatedDivisionData
    );

    res.status(200).json({
      success: true,
      message: "Division updated successfully",
      division: updatedDivision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update division",
      error: error.message,
    });
  }
};

export const deleteDiv = async (req, res) => {
  try {
    let divisionId = parseInt(req.params.id);

    const deletedDivision = await userService.deleteDivision(divisionId);

    res.status(200).json({
      success: true,
      message: "Division deleted successfully",
      division: deletedDivision,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete division",
      error: error.message,
    });
  }
};

export const getAllDivision = async (req, res) => {
  try {
    const divisions = await userService.getAllDivisions();
    res.status(200).json({
      divisions,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getDivisiById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const division = await userService.getDivisionById(id);
    if (!division) {
      return res.status(404).json({ message: "Division not found" });
    }
    res.status(200).json({ division });
  } catch (error) {            
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};