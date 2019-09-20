import { Todos } from "./todos"

export type VisibilityFilter = "show all" | "show completed" | "show active"

// Action
type SetVisibilityFilter = Readonly<{
  type: "set visibility filter"
  filter: VisibilityFilter
}>

export type VisibilityAction = SetVisibilityFilter

// Reducer
const visibilityReducer = (
  state: VisibilityFilter = "show all",
  action: VisibilityAction
) => (action.type === "set visibility filter" ? action.filter : state)

export default visibilityReducer

// Helper

export const filterTodos = (visibilityFilter: VisibilityFilter) => (
  todos: Todos
): Todos => {
  switch (visibilityFilter) {
    case "show all":
      return todos
    case "show completed":
      return todos.filter(({ completed }) => completed)
    case "show active":
      return todos.filter(({ completed }) => !completed)
    // default:
    //   return assertNever(visibilityFilter)
  }
}

// Library function
function assertNever(x: never): never {
  throw new Error("Unexpected case: " + x)
}
