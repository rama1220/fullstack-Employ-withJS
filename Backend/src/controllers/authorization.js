export const Role = {
  EMPLOYEE: "employee",
  ADMIN: "admin",
};

export const Permission = {
  READ_USER_PROFILE: "read_user_profile",
  UPDATE_USER_PROFILE: "update_user_profile",
  DELETE_USER_PROFILE: "delete_user_profile",
  CREATE_EMPLOYEE: "create_employee",
  READ_EMPLOYEE: "read_employee",
  UPDATE_EMPLOYEE: "update_employee",
  DELETE_EMPLOYEE: "delete_employee",
  CREATE_DIVISI: "create_divisi",
  READ_DIVISI: "read_divisi",
  UPDATE_DIVISI: "update_divisi",
  DELETE_DIVISI: "delete_divisi",
};

export const PermissionAssignment = {
  [Role.EMPLOYEE]: [
    Permission.READ_USER_PROFILE,
    Permission.UPDATE_USER_PROFILE,
  ],
  [Role.ADMIN]: [
    Permission.READ_USER_PROFILE,
    Permission.UPDATE_USER_PROFILE,
    Permission.DELETE_USER_PROFILE,
    Permission.CREATE_EMPLOYEE,
    Permission.READ_EMPLOYEE,
    Permission.UPDATE_EMPLOYEE,
    Permission.DELETE_EMPLOYEE,
    Permission.CREATE_DIVISI,
    Permission.READ_DIVISI,
    Permission.UPDATE_DIVISI,
    Permission.DELETE_DIVISI,
  ],
};
