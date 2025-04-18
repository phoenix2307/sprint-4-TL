import {Dispatch} from "redux"
import {todolistsApi} from "../api/todolistsApi"
import {Todolist} from "../api/todolistsApi.types"
import {RequestStatus, setAppStatusAC} from "../../../app/app-slice";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {ResultCode} from "common/enums";
import {handleServerAppError} from "common/utils/handleServerAppError";
import {createSlice} from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
    entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [],
    reducers: create => ({
        removeTodolistAC: create.reducer(),
        addTodolistAC: create.reducer(),
        changeTodolistTitleAC: create.reducer(),
        setTodolistsAC: create.reducer(),
        changeTodolistEntityStatusAC: create.reducer(),
    })
})

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        }

        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const newTodolist: DomainTodolist = {
                ...action.payload.todolist,
                filter: "all",
                entityStatus: 'idle'
            }
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl))
        }

        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((tl) => (tl.id === action.payload.id ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl))
        }

        default:
            return state
    }
}

// Action creators
export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const
}

export const addTodolistAC = (todolist: Todolist) => {
    return {type: "ADD-TODOLIST", payload: {todolist}} as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload} as const
}

export const setTodolistsAC = (todolists: Todolist[]) => {
    return {type: "SET-TODOLISTS", todolists} as const
}

export const changeTodolistEntityStatusAC = (payload: { id: string, entityStatus: RequestStatus }) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', payload} as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

// Thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodolistsAC(res.data))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'loading'}))
    todolistsApi.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === ResultCode.Success) {
                dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodolistTitleTC = (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(arg)
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTodolistTitleAC(arg))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType
