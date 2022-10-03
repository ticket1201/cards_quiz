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


export const cardsAPI = {
    getPacks(data: GetPacksParamsType) {
        return instance.get<getPacksResponseType>('/cards/pack', {
            params: {
                ...data
            }
        })
    },
    createPack(data: CreatePackDataType) {
        return instance.post('/cards/pack', {
            cardsPack: {
                ...data
            }
        })
    },
    deletePack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackDataType) {
        return instance.put('/cards/pack', {
            cardsPack: {
                ...data
            }
        })
    },

    getCards(data: GetCardParamsType) {
        return instance.get<getCardsResponseType>('/cards/card', {
            params: {
                ...data
            }
        })
    },
    createCard(data: CardRequestType) {
        return instance.post('/cards/card', {
            card: {
                ...data
            }
        })
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(data: UpdateCardRequestType) {
        return instance.put('/cards/card', {
            card: {
                ...data
            }
        })
    },
    updateGrade(data: UpdateCardGradeDataType) {
        return instance.put<UpdateCardGradeResponseType>('/cards/grade', {
            card: {
                ...data
            }
        })
    },
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

export type CreatePackDataType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type UpdatePackDataType = {
    _id: string
    name: string
    deckCover?: string
    private?: boolean
}

export type GetCardParamsType = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CardRequestType = {
    cardsPack_id: string // pack id
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardRequestType = CardRequestType & { _id: string }

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
    cardPacks: Array<PackDataType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
}

export type PackDataType = {
    _id: string  //pack id
    user_id: string
    user_name: string
    private: boolean
    name: string
    deckCover: string
    cardsCount: 0
    created: string
    updated: string
}

export type getCardsResponseType = {
    cards: Array<CardDataType>
    packName: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardDataType = {
    cardsPack_id: string
    user_id: string
    _id: string

    answer: string
    question: string
    comments: string
    grade: number
    shots: number
    created: string
    updated: string

    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
}

export type UpdateCardGradeDataType = {
    card_id: string
    grade: number
}

export type UpdateCardGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}