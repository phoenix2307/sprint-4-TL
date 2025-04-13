
# 🧠 Redux Toolkit `create.reducer<>()` Шпаргалка

Коли використовуєш `create.reducer<Payload>()`, дженерик означає тип **payload**, який передається в action.

---

## 📌 Типові приклади

| Тип payload                 | Дженерик у `create.reducer`                     | Приклад використання                                                                 |
|----------------------------|--------------------------------------------------|--------------------------------------------------------------------------------------|
| **Об'єкт**                 | `<{ key: Type }>`                                | `create.reducer<{ themeMode: ThemeMode }>((state, action) => { ... })`             |
| **Примітив** (`string`, `number`, тощо) | `<string>`                                     | `create.reducer<string>((state, action) => { ... })`                               |
| **Масив об'єктів**         | `<T[]>`                                          | `create.reducer<TodolistType[]>((state, action) => { ... })`                       |
| **Нічого не передається** (`void`)   | `<void>`                                         | `create.reducer<void>((state) => { ... })`                                         |
| **Багато полів (payload-об'єкт)** | `<{ id: string; title: string }>`                 | `create.reducer<{ id: string; title: string }>((state, action) => { ... })`        |

---

## ✅ Конкретні приклади

### 1. Об'єкт:
```ts
changeThemeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
    state.themeMode = action.payload.themeMode
})
```

### 2. Масив:
```ts
setTodolistsAC: create.reducer<TodolistType[]>((state, action) => {
    return action.payload
})
```

### 3. Примітив:
```ts
setFilterAC: create.reducer<string>((state, action) => {
    state.filter = action.payload
})
```

### 4. Без payload:
```ts
resetAC: create.reducer<void>((state) => {
    return initialState
})
```

### 5. Payload з кількома полями:
```ts
changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
    const tl = state.find(t => t.id === action.payload.id)
    if (tl) tl.title = action.payload.title
})
```

---

## 💡 Порада

Якщо є заздалегідь оголошений тип:
```ts
type ChangeTitlePayload = { id: string; title: string }
```

Можна писати:
```ts
changeTodolistTitleAC: create.reducer<ChangeTitlePayload>((state, action) => { ... })
```

---

🔧 Підходить для використання з `createSlice({ reducers: create => ({ ... }) })` у Redux Toolkit v2+
