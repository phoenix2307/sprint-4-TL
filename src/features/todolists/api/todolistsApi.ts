import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";

export const todolistsApi = {

    getTodolistApi() {
        return instance.get<Todolist[]>('todo-lists')
    },

    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload
        return instance.put<BaseResponse>(`todo-lists/${id}`, {title})
    },

    createTodolist(payload: { title: string}) {
        const {title} = payload
        return instance
            .post<BaseResponse<{item: Todolist}>>(`todo-lists`,{title})
    },

    deleteTodolist(payload: { id: string }) {
        const {id} = payload
        return instance
            .delete<BaseResponse>(`todo-lists/${id}`)
    }
}