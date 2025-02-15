import {Dispatch} from "redux";
import {LoginArgs} from "../api/authApi.types";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authApi} from "../api/authApi";

type InitialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState,
                            action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return state
        default: return state
    }
}

type ActionsType = ReturnType<typeof setIsLoggedInAC>

// action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        payload: {isLoggedIn}
    } as const
}

//thunk creators
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(res => {
            res
                ? dispatch(setIsLoggedInAC(true))
                : dispatch(setIsLoggedInAC(false))
        })
    // dispatch(setIsLoggedInAC(true))
}