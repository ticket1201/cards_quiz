import {AuthMeAC, authReducer, InitialStateType} from './auth_reducer';

let startState: InitialStateType, endState: InitialStateType;
const oldId = ''

beforeEach(() => {
    startState = {
        id: oldId
    }
})


test('set new id into the state', () => {
    const newId = '134'
    endState = authReducer(startState, AuthMeAC(newId))

    expect(startState.id).toBe(oldId)
    expect(endState.id).toBe(newId)
})