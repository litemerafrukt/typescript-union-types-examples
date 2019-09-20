import produce from "immer"

type Id = number
let nextTodoId: Id = 0

// State
type Todo = Readonly<{
  id: Id
  text: string
  completed: boolean
}>

const initialState = Array<Todo>()

export type Todos = Readonly<typeof initialState>

// Actions
type AddTodo = Readonly<{
  type: "add todo"
  text: string
}>

type ToggleTodo = Readonly<{
  type: "toggle todo"
  id: number
}>

export type TodosAction = AddTodo | ToggleTodo

// Reducer
const todosReducer = (state: Todos = [], action: TodosAction) =>
  produce(state, draft => {
    switch (action.type) {
      case "add todo":
        draft.push(<Todo>{
          id: nextTodoId++,
          text: action.text,
          completed: false
        })
        break
      case "toggle todo":
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
    }
  })

export default todosReducer
