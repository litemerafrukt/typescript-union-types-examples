import { createStore, Dispatch } from "redux"
import rootReducer, { Action } from "./todos/store"
import { filterTodos } from "./todos/visibility_filter"

const store = createStore(rootReducer)

store.getState() // ?

store.dispatch<Action>({ type: "add todo", text: "Fix the typescript demo" })
store.dispatch<Action>({ type: "add todo", text: "give short lecture on union types" })

store.getState() // ?

store.dispatch<Action>({ type: "toggle todo", id: 1 })
store.dispatch<Action>({ type: "set visibility filter", filter: "show completed" })

const { todos, visibilityFilter } = store.getState() // ?

filterTodos(visibilityFilter)(todos) // ?
