export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET || "SomeAccessSecret123!",
  accessExpresIn: process.env.JWT_ACCESS_EXPIRE || "5m",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "SomeRefreshSecret123!",
  refreshExpresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
};
