import axios from 'axios'
import {DeleteTodolistResponse, Todolist, UpdateTodolistResponse} from "./todolistsApi.types";
import {CreateTaskResponse} from "./tasksApi.types";

export const todolistsApi = {
    getTodolistApi() {
        return axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {
                headers: {
                    Authorization: `Bearer 134f0918-8765-4389-99d5-e97a27c472d5`
                }
            })
    },

    updateTodolist(payload: {id: string, title: string}) {
        const {id, title} = payload
        return axios.put<UpdateTodolistResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                    'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                },
            }
        )
    },
    createTodolist(payload: {title: string, todolistId: string}) {
        const {title, todolistId} = payload
        return axios
            .post<CreateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                        'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                    },
                }
            )
    },
    deleteTodolist(payload: {id: string}) {
        const {id} = payload
        return axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                    'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                },
            })
    }
}