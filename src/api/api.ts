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
        return instance.post<AuthResponseType>('/auth/login', data)
    },
    register(data: RegisterParamsType) {
        return instance.post<RegisterResponseType>('/auth/register', data)
    },
    me() {
        return instance.post<AuthResponseType>('auth/me', {})
    },
    logout() {
        return instance.delete<DefaultResponseType>('/auth/me')
    },
    updateProfile(data: UpdateProfileDataType) {
        return instance.put<UpdatedUserResponseType>('/auth/me', data)
    },
    forgotPassword(data: ForgotPasswordDataType) {
        return instance.post<DefaultResponseType>('/auth/forgot', data)
    },
    setNewPassword(data: SetPasswordDataType) {
        return instance.post<DefaultResponseType>('/auth/set-new-password', data)
    },
    blockContent(data: BlockContentDataType) {
        return instance.post<BlockContentResponseType>('/auth/block', data)
    }
}


export const CardsAPI = {
    getPacks(data: GetPacksParamsType) {
        return instance.get<getPacksResponseType>('/cards/pack', {
            params: {
                ...data
            }
        })
    },
    createPack(data: CreatePackDataType) {
        return instance.post('/cards/pack', data)
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackDataType) {
        return instance.put('/cards/pack', data)
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
export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}

export type RequestPacksType<T> = {
    cardsPack: T
}

export type CreatePackDataType = RequestPacksType<{
    name?: string
    deckCover?: string
    private?: boolean
}>

export type UpdatePackDataType = RequestPacksType<{
    _id: string
    name: string
    deckCover?: string
    private?: boolean
}>


// response types

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

export type AddedUserType = AuthResponseType & {
    __v: number
}

export type RegisterResponseType = {
    'addedUser': AddedUserType
}

export type UpdatedUserResponseType = {
    updatedUser: AuthResponseType
}

export type getPacksResponseType = {
    cardsPacks: Array<PackDataType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}

export type PackDataType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    deckCover: string
    cardsCount: 0
    created: string
    updated: string
}