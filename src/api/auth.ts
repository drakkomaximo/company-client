import { ROUTES, User } from "../utils";
import axiosIntance from "./axios";

export const registerRequest = async ({ user }: { user: User }) =>
  axiosIntance.post(ROUTES.REGISTER, user);

export const loginRequest = async ({
  user,
}: {
  user: Omit<User, "username">;
}) => axiosIntance.post(ROUTES.LOGIN, user);

export const verifyTokenRequest = async (_res: any) =>
  axiosIntance.get(ROUTES.VERIFYTOKEN);
