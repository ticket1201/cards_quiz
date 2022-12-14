import {
    AppInitialStateType,
    appReducer,
    RequestStatusType,
    setAppErrorAC,
    setAppIsInitializedAC,
    setAppStatusAC, setAppSuccessAC
} from './app_reducer';

let startState: AppInitialStateType, endState: AppInitialStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        success: null,
        isInitialized: false
    }
})


test('set app error', () => {
    const newError = 'error'
    endState = appReducer(startState, setAppErrorAC(newError))

    expect(startState.error).toBe(null)
    expect(endState.error).toBe(newError)
})

test('set app success', () => {
    endState = appReducer(startState, setAppSuccessAC('SUCCESS'))

    expect(startState.success).toBe(null)
    expect(endState.success).toBe('SUCCESS')
})

test('set new app status', () => {
    const newStatus: RequestStatusType = 'loading'
    endState = appReducer(startState, setAppStatusAC(newStatus))

    expect(startState.status).toBe('idle')
    expect(endState.status).toBe(newStatus)
})

test('set app isInitialized', () => {
    endState = appReducer(startState, setAppIsInitializedAC(true))

    expect(startState.isInitialized).toBe(false)
    expect(endState.isInitialized).toBe(true)
})