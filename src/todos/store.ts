import { combineReducers } from "redux"
import todos, { TodosAction } from "./todos"
import visibilityFilter, { VisibilityAction } from "./visibility_filter"

export type Action = TodosAction | VisibilityAction

const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

export type State = ReturnType<typeof rootReducer>

export default rootReducer
