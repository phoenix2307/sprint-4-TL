import {DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types";
import {Todolist} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";

export const tasksApi = {
    createTask(payload: {title: string, todolistId: string}) {
        const {title, todolistId} = payload
        return instance.post<BaseResponse<{item: DomainTask}>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    getTasks(payload: { tl: Todolist }) {
        const {tl} = payload
        return instance.get<GetTasksResponse>(`todo-lists/${tl.id}/tasks`)
    },

    changeTaskStatus(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance
            .put<BaseResponse<{item: DomainTask}>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    },

    changeTaskTitle(payload: { task: DomainTask, model: UpdateTaskModel }) {
        const {task, model} = payload
        return instance
            .put<BaseResponse<{item: DomainTask}>>(
                `todo-lists/${task.todoListId}/tasks/${task.id}`, model)
    },

    deleteTask(payload: { taskId: string, todolistId: string }) {
        const {taskId, todolistId} = payload
        return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}