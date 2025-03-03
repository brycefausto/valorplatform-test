export enum UserRole {
  ADMIN = "Admin",
  DISTRIBUTOR = "Distributor",
  RESELLER = "Reseller",
  VIP = "VIP",
  CUSTOMER = "Customer"
}

export const userRoles = Object.values(UserRole)