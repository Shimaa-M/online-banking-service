export enum RolesEnum {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  OWNER = 'Account Owner',
  MANAGER = 'Manager',
  STAFF = 'Staff',
  CUSTOMER = 'Customer'
}

export const RoleGroups = {
  REGISTRATION: [RolesEnum.OWNER, RolesEnum.CUSTOMER],
  ADMINSTRATION: [RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN],
  ACCOUNT_ADMINSTRATION: [ RolesEnum.OWNER],
  ACCOUNT_MANAGEMENT: [RolesEnum.STAFF, RolesEnum.OWNER, RolesEnum.MANAGER],
  PROFILE:[RolesEnum.STAFF, RolesEnum.OWNER, RolesEnum.MANAGER,RolesEnum.CUSTOMER]
};
