import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

config();
const bcryptRound = Number(process.env.BCRYPT_ROUND) || 5;
export const login = async (email, password) => {
    try {
        // Cari pengguna berdasarkan alamat email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                role: true
            }
        });
        if (!user) {
            throw new Error("Invalid email or password.");
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            throw new Error("Invalid email or password.");
        }
        const token = jwt.sign({ userId: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const expired = new Date();
        expired.setDate(expired.getDate() + 1);
        await prisma.token.create({
            data: {
                token,
                userId: user.id,
                expire_at: expired
            }
        });

        return { user, token };
    } catch (error) {
        throw error;
    }
};
export const createAdmin = async (userData) => {
    try {

        const hashedPassword = await bcrypt.hash(userData.password, bcryptRound);
        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                roleId: 2 
            }
        });

        return newUser;
    } catch (error) {
        throw error;
    }
}
export const handleCreateEmploy = async (adminId, userData) => {
    try {
        const admin = await prisma.user.findUnique({
            where: {
                id: adminId,
                roleId: 2 
            }
        });

        if (!admin) {
            throw new Error("Only admin can create employee account.");
        }
        const hashedPassword = await bcrypt.hash(userData.password, bcryptRound);
        const newUser = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                roleId: 1, 
                employee: {
                    create: {
                        address: userData.address,
                        phone: userData.phone
                    }
                }
            }
        });

        return newUser;
    } catch (error) {
        throw error;
    }
};
export const deleteEmployee = async (adminId, employeeId) => {
    try {
        const admin = await prisma.user.findUnique({
            where: {
                id: adminId,
                roleId: 2 
            }
        });

        if (!admin) {
            throw new Error("Only admin can delete employee accounts.");
        }
        const employee = await prisma.employee.findFirst({
            where: {
                userId: employeeId
            }
        });

        if (!employee) {
            throw new Error("Employee not found.");
        }
        await prisma.token.deleteMany({
            where: {
                userId: employeeId
            }
        });
        await prisma.employee.delete({
            where: {
                id: employee.id 
            }
        });
        const deletedUser = await prisma.user.delete({
            where: {
                id: employeeId
            }
        });

        return deletedUser;
    } catch (error) {
        throw error;
    }
};

export const readEmployee = async () => {
try{
    const employees = await prisma.employee.findMany({
        include: {
            user: {
                select : {
                    name : true,
                    email : true,
                    password : true
                }
            }
        }
    });
    return employees;
}catch(error){
    throw error;
}
};

export const getEmployeById = async (userId) => {
  try {
    const user = await prisma.employee.findUnique({
      where: {
        id: userId
      }, include : {
        user : {
            select : {
                name : true,
                email : true,
                password : true
            }
        }
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
};
export const updateEmployee = async (adminId, employeeId, updatedData) => {
    
    try {
        const admin = await prisma.user.findUnique({
            where: {
                id: adminId,
                roleId: 2 
            }
        });

        if (!admin) {
            throw new Error("Only admin can update employee profile.");
        }
        const hashedPassword = await bcrypt.hash(updatedData.password, bcryptRound);
        // Memperbarui profil karyawan
        const updatedEmployee = await prisma.user.update({
            where: {
                id: employeeId
            },
            data: {
                name: updatedData.name,
                email: updatedData.email,
                password: hashedPassword,
                employee: {
                    updateMany: {
                        where: {
                            userId: employeeId
                        }, data: {
                            address: updatedData.address,
                            phone: updatedData.phone
                        }
                    }
                }
            }, include: {
                employee:{
                    select : {
                        address : true,
                        phone : true
                    }
                }
            }
        });

        return updatedEmployee;
    } catch (error) {
        throw error;
    }
}
export const readProfile = async (userId) => {
    try {
        // Membaca profil sendiri sebagai karyawan
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                employee: true
            }
        });

        if (!user) {
            throw new Error("User not found.");
        }

        return user;
    } catch (error) {
        throw error;
    }
};
export const updateProfile = async (userId, userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, bcryptRound);

    try {
        const updateEmploye = await prisma.user.update({
             where: {
             id: userId
             },
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                roleId: 1, 
                employee: {
                    updateMany: {
                        where: {
                            userId: userId
                        },
                        data : {
                            address: userData.address,
                            phone: userData.phone
                        }
                    }
                }
            }
        });

        return updatedUser;
    } catch (error) {
        throw error;
    }
};
