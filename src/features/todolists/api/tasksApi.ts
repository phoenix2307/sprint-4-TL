import axios from 'axios'
import {DeleteTaskResponse, DomainTask, GetTasksResponse, UpdateTaskModel, UpdateTaskResponse} from "./tasksApi.types";
import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";

export const tasksApi = {

    getTasks(payload: { tl: Todolist }) {
        const {tl} = payload
        return instance.get<GetTasksResponse>(`todo-lists/${tl.id}/tasks`)
    },

    changeTaskStatus(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance
            .put<UpdateTaskResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    },

    changeTaskTitle(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance
            .put<UpdateTaskResponse>(
                `todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    },

    deleteTask(payload: { taskId: string, todolistId: string }) {
        const {taskId, todolistId} = payload
        return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}