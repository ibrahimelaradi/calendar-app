import bcrypt from "bcrypt";
import authDal from "./auth.dal";
import { SignupParams } from "@calendar-app/schemas/dtos/auth.dto";
import jwt from "../common/jwt";
import { ValidationError } from "../common/error";

const authService = {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },
  verifyPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
  async signup(params: SignupParams) {
    if (await authDal.isUsernameTaken(params.username)) {
      throw ValidationError.make("Username is already taken").addError(
        "username",
        "Username is already taken"
      );
    }

    const { password, ...data } = params;
    const passwordHash = await this.hashPassword(password);
    const userId = await authDal.insertUser({ passwordHash, ...data });

    return jwt.createTokens(userId);
  },
  async resolveUserById(userId: string) {
    return authDal.getUserById(userId);
  },
};

export default authService;
