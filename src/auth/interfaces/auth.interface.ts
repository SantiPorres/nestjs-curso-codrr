import { ROLES } from "src/constants/roles";
import { UserEntity } from "src/users/entities/users.entity";

export interface IPayloadToken {
    sub: string;
    role: ROLES;
}

export interface IAuthBody {
    username: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    user: UserEntity;
}

export interface IAuthTokenResult {
    role: string;
    sub:  string;
    iat:  number;
    exp:  number;
}

export interface IUseToken {
    role: string;
    sub:  string;
    isExpired: boolean;
}
