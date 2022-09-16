import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:7542/2.0/'
        : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// API

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<AuthResponseType>, LoginParamsType>('/auth/login', data)
    },
    register(data: RegisterParamsType) {
        return instance.post<ResponseType<RegisterResponseType>>('/auth/register', data)
    },
    me() {
        return instance.post<ResponseType<AuthResponseType>, {}>('auth/me', {})
    },
    logout() {
        return instance.delete<ResponseType<DefaultResponseType>>('/auth/me')
    },
    updateProfile(data: UpdateProfileDataType) {
        return instance.put<ResponseType<AuthResponseType>>('/auth/me', data)
    },
    forgotPassword(data: ForgotPasswordDataType) {
        return instance.post<ResponseType<DefaultResponseType>>('/auth/forgot', data)
    },
    setNewPassword(data: SetPasswordDataType) {
        return instance.post<ResponseType<DefaultResponseType>>('/auth/set-new-password', data)
    },
    blockContent(data: BlockContentDataType) {
        return instance.post<ResponseType<BlockContentResponseType>>('/auth/block', data)
    }
}

// request types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type RegisterParamsType = {
    email: string
    password: string
}


export type UpdateProfileDataType = {
    name: string
    avatar: string
}
export type ForgotPasswordDataType = {
    email: string
    from: string
    message: string
}
export type SetPasswordDataType = {
    password: string
    resetPasswordToken: string
}
export type BlockContentDataType = {
    id: string
    blockReason: string
}

// response types

export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type DefaultResponseType = {
    info: string
    error?: string
}

export type AuthResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;

    /* ????????
    "__v": 0,
    "token": "f1081d00-3614-11ed-b186-bb9b23e58d65",
    "tokenDeathTime": 1663380708944
     */
}

export type BlockContentResponseType = {
    user: string
    blockedCardPacksCount: number
}

export type AddedUserType = AuthResponseType & {
    __v: number
}

export type RegisterResponseType = {
    'addedUser': AddedUserType
}
/*
    error: string,
    email: string,
    in: string
 */