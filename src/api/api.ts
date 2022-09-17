import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:7542/2.0/'
        : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// API

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<'', AxiosResponse<AuthResponseType>, LoginParamsType>('/auth/login', data)
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
}

export type BlockContentResponseType = {
    user: string
    blockedCardPacksCount: number
}