import { User } from "../types/user";

export const getUserContactData = (user: User) => {
  return {
    firstName: user.name?.split(" ")[0] || "",
    lastName: user.name?.split(" ")[1] || "",
    email: user.email || "",
    phone: user.phone || "",
  };
};

export {};