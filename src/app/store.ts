import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { thunk, ThunkDispatch } from "redux-thunk"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-slice"
import {appReducer, appSlice} from "./app-slice"
import {composeWithDevTools} from "redux-devtools-extension";
import {authReducer} from "../features/auth/model/auth-reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  // tasks: tasksReducer,
  todolists: todolistsReducer,
  // todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
  // auth: authReducer,
})

export const store = legacy_createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
