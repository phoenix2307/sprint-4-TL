import {DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";
import {CreateTaskResponse} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance";

export const todolistsApi = {
    getTodolistApi() {
        return instance.get<Todolist[]>('todo-lists')
    },

    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload
        return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, {title})
    },

    createTodolist(payload: { title: string, todolistId: string }) {
        const {title, todolistId} = payload
        return instance
            .post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTodolist(payload: { id: string }) {
        const {id} = payload
        return instance
            .delete<DeleteTodolistResponse>(`todo-lists/${id}`)
    }
}