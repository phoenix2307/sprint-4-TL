import Checkbox from '@mui/material/Checkbox'
import axios from "axios";
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import {CreateTodolistResponse, Todolist} from "../features/todolists/api/todolistsApi.types";
import {DomainTask, UpdateTaskModel} from "../features/todolists/api/tasksApi.types";
import {todolistsApi} from "../features/todolists/api/todolistsApi";
import {tasksApi} from "../features/todolists/api/tasksApi";


export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<{
        [key: string]: DomainTask[]
    }>({})

    useEffect(() => {
        todolistsApi.getTodolistApi().then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach((tl) => {
                tasksApi.getTasks({tl}).then((res) => {
                    setTasks((prevState) => {
                        return {...prevState, [tl.id]: res.data.items}
                    })
                })
            })
        })
    }, [])

    //============== Todolists ================================

    const createTodolistHandler = (title: string) => {
        axios
            .post<CreateTodolistResponse>(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title},
                {
                    headers: {
                        Authorization: 'Bearer 134f0918-8765-4389-99d5-e97a27c472d5',
                        'API-KEY': '8d201fb1-33ed-4ec9-a013-6de2e03bc35f',
                    },
                }
            )
            .then(res => {
                const newTodolist = res.data.data.item
                setTodolists([newTodolist, ...todolists])
                setTasks({...tasks, [newTodolist.id]: []})
            })
    }

    const removeTodolistHandler = (id: string) => {
        todolistsApi.deleteTodolist({id})
            .then(() => {
                const newTodolists = todolists.filter((item) => item.id !== id)
                setTodolists(newTodolists)
            })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id, title})
            .then(() => {
                const newTodolists = todolists.map((item) => item.id === id ? {...item, title} : item)
                setTodolists(newTodolists)
            })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        todolistsApi.createTodolist({title, todolistId})
            .then(res => {
                const newTask = res.data.data.item
                setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
            })
    }

    //=============== Tasks ==================================

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.deleteTask({taskId, todolistId})
            .then(() => {
                setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
            })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0;
        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }

        tasksApi.changeTaskStatus({task, model})
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {

        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        }

        tasksApi.changeTaskTitle({task, model})
            .then(() => {
                const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t)
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
