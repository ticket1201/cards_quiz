import {authMeAC, authReducer, AuthInitialStateType, logoutAC, setLoginDataAC} from './auth_reducer';
import {AuthResponseType} from '../../api/api';

let startState: AuthInitialStateType, endState: AuthInitialStateType;

beforeEach(() => {
    startState = {
        _id: null,
        email: '',
        name: '',
        avatar: 'https//avatar-url.img',
        publicCardPacksCount: null
    }
})


test('set user data into the state wia auth me request', () => {
    const user = {
        _id: '124',
        email: 'someMail@gmail.com',
        name: 'Alex',
        avatar: 'https//avatar1-url.img',
        publicCardPacksCount: 24
    } as AuthResponseType
    endState = authReducer(startState, authMeAC(user))

    expect(startState._id).toBe(null)
    expect(startState.publicCardPacksCount).toBe(null)
    expect(endState._id).toBe('124')
    expect(endState.publicCardPacksCount).toBe(24)
})

test('set user data into the state wia login request', () => {
    const user = {
        _id: '125',
        email: 'randomMail@gmail.com',
        name: 'Kate',
        avatar: 'https//avatar2-url.img',
        publicCardPacksCount: 5
    } as AuthResponseType
    endState = authReducer(startState, setLoginDataAC(user))

    expect(startState.name).toBe('')
    expect(startState.email).toBe('')
    expect(endState.name).toBe('Kate')
    expect(endState.email).toBe('randomMail@gmail.com')
})

test('update user data in the state', () => {
    const user = {
        _id: '352',
        email: 'oneMoreMail@gmail.com',
        name: 'Mike',
        avatar: 'https//avatar3-url.img',
        publicCardPacksCount: 26
    } as AuthResponseType
    endState = authReducer(startState, setLoginDataAC(user))

    expect(startState.name).toBe('')
    expect(endState.name).toBe('Mike')
})

test('user data should be removed from the state', () => {
    endState = authReducer(startState, logoutAC())

    expect(startState.avatar).toBe('https//avatar-url.img')
    expect(endState.avatar).toBe(null)
})