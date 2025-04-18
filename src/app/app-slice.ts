import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = "dark" | "light"
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorAppType = string | null

// type InitialState = typeof initialState

// const initialState = {
//     themeMode: "dark" as ThemeMode,
//     status: 'idle' as RequestStatus,
//     error: null as ErrorAppType
// }

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: "dark" as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as ErrorAppType
    },
    reducers: create => ({
        changeThemeAC: create.reducer<{themeMode: ThemeMode}>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppStatusAC: create.reducer<{status: RequestStatus}>( (state, action) => {
            state.status = action.payload.status
        } ),
        setAppErrorAC: create.reducer<{error: ErrorAppType}>( (state, action) => {
            state.error = action.payload.error
        } )
    })
})

export const {changeThemeAC, setAppStatusAC, setAppErrorAC} = appSlice.actions
export const appReducer = appSlice.reducer
//
// export const appSlice_2 = (state: InitialState = initialState, action: ActionsType): InitialState => {
//     switch (action.type) {
//         case "CHANGE_THEME":
//             return {...state, themeMode: action.payload.themeMode}
//         case "SET_STATUS": {
//             return {...state, status: action.payload.status}
//         }
//         case "APP/SET-ERROR": {
//             return {...state, error: action.payload.error}
//         }
//         default:
//             return state
//     }
// }
//
// // Action creators
// export const changeThemeAC = (themeMode: ThemeMode) => {
//     return {
//         type: "CHANGE_THEME",
//         payload: {themeMode},
//     } as const
// }
//
// export const setAppStatusAC = (status: RequestStatus) => {
//     return {
//         type: 'SET_STATUS',
//         payload: {status}
//     } as const
// }
//
// export const setAppErrorAC = (error: ErrorAppType) => {
//     return {
//         type: 'APP/SET-ERROR',
//         payload: {error}
//     } as const
// }
//
// // Actions types
// type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
// type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// type SetErrorAppActionType = ReturnType<typeof setAppErrorAC>
//
// type ActionsType = ChangeThemeActionType | SetAppStatusActionType | SetErrorAppActionType
