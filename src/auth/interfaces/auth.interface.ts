import { ROLES } from "src/constants/roles";

export interface IPayloadToken {
    sub: string;
    role: ROLES;
}

export interface IAuthBody {
    username: string;
    password: string;
}