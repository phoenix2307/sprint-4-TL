import axios from 'axios'
import {DeleteTaskResponse, DomainTask, GetTasksResponse, UpdateTaskModel, UpdateTaskResponse} from "./tasksApi.types";
import {Todolist} from "./todolistsApi.types";

export const tasksApi = {
    getTasks(payload:{tl: Todolist}) {
        const {tl} = payload
        return axios
            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
            headers: {
                Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
            },
        })
    },
    changeTaskStatus(payload: {task: DomainTask, model: UpdateTaskModel}) {
        const {task, model} = payload

        return axios
            .put<UpdateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                    'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                },
            }
        )
    },
    changeTaskTitle(payload: {task: DomainTask, model: UpdateTaskModel}) {
        const {task, model} = payload
        return axios
            .put<UpdateTaskResponse>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model,
            {
                headers: {
                    Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                    'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                },
            }
        )
    },
    deleteTask(payload: {taskId: string, todolistId: string}) {
        const {taskId, todolistId} = payload
        return axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
            },
        })
    }
}