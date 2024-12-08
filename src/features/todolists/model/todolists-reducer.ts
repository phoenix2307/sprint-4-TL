import {v1} from "uuid"
import {Todolist} from "../api/todolistsApi.types";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";

export type FilterValuesType = "all" | "active" | "completed"

export type DomainTodolist = Todolist & {
    filter: FilterValuesType
}

const initialState: DomainTodolist[] = []

export const todolistsReducer = (state: DomainTodolist[] = initialState, action: ActionsType): DomainTodolist[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        }

        case "REMOVE-TODOLIST": {
            return state.filter((tl) => tl.id !== action.payload.id)
        }

        case "ADD-TODOLIST": {
            const newTodolist: DomainTodolist = {
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: "all",
                addedDate: '',
                order: 0,
            }
            return [newTodolist, ...state]
        }

        case "CHANGE-TODOLIST-TITLE": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl))
        }

        case "CHANGE-TODOLIST-FILTER": {
            return state.map((tl) => (tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl))
        }

        default:
            return state
    }
}

// Action creators
export const setTodolistsAC = (todolists: Todolist[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const
}

export const addTodolistAC = (todolist: Todolist) => {
    return {type: "ADD-TODOLIST", payload: {title: todolist.title, todolistId: todolist.id}} as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload} as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload} as const
}

// Actions types
export type SetTodolistsAcitonType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = SetTodolistsAcitonType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

// Thunk

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })

}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item))
    })
}

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(id).then(res => {
        dispatch(removeTodolistAC(id))
    })
}

export const updateTodolistTitleTC = (arg: {
    title: string,
    todolist: DomainTodolist
}) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolist({id: arg.todolist.id, title: arg.title}).then(res => {
        dispatch(changeTodolistTitleAC({id: arg.todolist.id, title: arg.title}))
    })
}