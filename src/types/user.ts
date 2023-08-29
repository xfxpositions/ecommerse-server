import Roles from "./roles";
import { Document } from "mongoose";

interface IUser extends Document {
  role: Roles;
  id: string;
  username: string;
  name: string;
  roles: string[];
  password: string;
  adresses: string[];
  phone: number;
  email: string;
  verified: {
    email: boolean;
    phone: boolean;
  };
}

// class Customer {
//   value: ICustomer;
//   constructor(customer: ICustomer) {
//     this.value = customer;
//   }
// }

export default IUser;
