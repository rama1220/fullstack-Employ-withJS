import * as userService from '../services/userService.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.login(email, password);
        res.status(200).json({
            user: user,
            token: token
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const handleCreateEmploy = async (req, res) => {
    try {
        const newUser = await userService.handleCreateEmploy(req.user.id, req.body);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
export const createAdmin = async (req, res) => {
    try {
        const newUser = await userService.createAdmin(req.body);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedEmployee = await userService.deleteEmployee(req.user.id, id);
        res.status(200).json({
            message: 'Employee deleted successfully',
            user: deletedEmployee
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const readEmploy = async (req, res) => {
   try {
    const employ = await userService.readEmployee();
    res.status(200).json({
        employ
    });
   } catch (error) {
    res.status(400).json({
        message: error.message      
   })
}
}

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
        const updatedEmployee = await userService.updateEmployee(adminId, id, updatedData);
        res.status(200).json({
            message: 'Employee updated successfully',
            user: updatedEmployee
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const readProfile = async (req, res) => {
    try {
        const user = await userService.readProfile(req.user.id);
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateProfile(req.user.id, req.body);
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}
