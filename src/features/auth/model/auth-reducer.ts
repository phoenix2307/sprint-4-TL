import {Dispatch} from "redux";
import {LoginArgs} from "../api/authApi.types";
import {setAppStatusAC} from "../../../app/app-reducer";
import {authApi} from "../api/authApi";
import {ResultCode} from "common/enums";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";

type InitialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState,
                            action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
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
            if (res.data.resultCode === ResultCode.Success){
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
                localStorage.setItem('sn-token', res.data.data.token)
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.Success){
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
                localStorage.removeItem('sn-token')
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}