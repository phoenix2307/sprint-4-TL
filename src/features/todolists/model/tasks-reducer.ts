import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer"
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";
import {DomainTask, UpdateTaskModel} from "../api/tasksApi.types";

export type TasksStateType = {
    [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
            }
        }
        case "ADD-TASK": {
            const newTask: DomainTask = action.payload.task
            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        // case "CHANGE_TASK_STATUS": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
        //             t.id === action.payload.taskId
        //                 ? {
        //                     ...t,
        //                     status: action.payload.status,
        //                 }
        //                 : t,
        //         ),
        //     }
        // }
        // case "CHANGE_TASK_STATUS": {
        //     return {
        //         ...state,
        //         [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
        //             t.id === action.payload.task.id
        //                 ? {
        //                     ...t,
        //                     status: action.payload.task.status,
        //                 }
        //                 : t,
        //         ),
        //     }
        // }
        // case "CHANGE_TASK_TITLE": {
        //     return {
        //         ...state,
        //         [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
        //             t.id === action.payload.task.id
        //                 ? {
        //                     ...t,
        //                     title: action.payload.task.title,
        //                 }
        //                 : t,
        //         ),
        //     }
        // }
        case "UPDATE_TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
                    t.id === action.payload.task.id
                        ? {
                            ...t,
                            title: action.payload.task.title,
                            status: action.payload.task.status
                        }
                        : t,
                ),
            }
        }

        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistId]: []}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
    }
}

// Action creators
export const setTasksAC = (payload: { todolistId: string, tasks: DomainTask[] }) => {
    return {
        type: 'SET-TASKS',
        payload
    } as const
}
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
    return {
        type: "REMOVE-TASK",
        payload,
    } as const
}
export const addTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "ADD-TASK",
        payload,
    } as const
}
export const updateTaskAC = (payload: { task: DomainTask }) => {
    return {
        type: "UPDATE_TASK",
        payload,
    } as const
}
//
// export const changeTaskStatusAC = (payload: { taskId: string; status: TaskStatus; todolistId: string }) => {
//     return {
//         type: "CHANGE_TASK_STATUS",
//         payload,
//     } as const
// }
// export const changeTaskStatusAC = (payload: { task: DomainTask }) => {
//     return {
//         type: "CHANGE_TASK_STATUS",
//         payload,
//     } as const
// }
// export const changeTaskTitleAC = (payload: { task: DomainTask }) => {
//     return {
//         type: "CHANGE_TASK_TITLE",
//         payload,
//     } as const
// }

// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
// export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = SetTasksActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | UpdateTaskActionType
// | ChangeTaskStatusActionType
// | ChangeTaskTitleActionType

// Thunk
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC({todolistId, tasks}))
    })
}
export const removeTaskTC = (arg: { taskId: string, todolistId: string }) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(arg).then(res => {
        dispatch(removeTaskAC(arg))
    })
}
export const addTaskTC = (arg: { title: string, todolistId: string }) => (dispatch: Dispatch) => {
    tasksApi.createTask(arg).then(res => {
        dispatch(addTaskAC({task: res.data.data.item}))
    })
}
// export const changeTaskStatusTC = (arg: {taskId: string, status: TaskStatus, todolistId: string}) => (dispatch: Dispatch, getState: () => RootState) => {
//     const {taskId, status, todolistId} = arg
//
//     const allTasksFromState = getState().tasks
//     const tasksForCurrentTodolist = allTasksFromState[todolistId]
//     const task = tasksForCurrentTodolist.find(t => t.id === taskId)
//
//     if(task) {
//         const model: UpdateTaskModel = {
//             status: task.status,
//             title: task.title,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//         }
//         tasksApi.updateTask({model, taskId: task.id, todolistId: task.todoListId}).then(res => {
//             dispatch(changeTaskStatusAC({taskId, status, todolistId}))
//         })
//     }
//
//
//
// }
export const updateTaskTC = (task: DomainTask) => (dispatch: Dispatch) => {
    const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
    }
    tasksApi.updateTask({model, taskId: task.id, todolistId: task.todoListId}).then(res => {
        dispatch(updateTaskAC({task: res.data.data.item}))
    })
}


