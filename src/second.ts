/* Action creators, reducer and types Quokka demo */
import produce from "immer"
import { thread } from "./utils"

// State

type Player = Readonly<{
  name: string
  points: number
  liked: boolean
}>

const initialState = {
  players: Array<Player>()
}

type State = Readonly<typeof initialState>

// Action creators

const createPlayer = (name: string) =>
  <const>{
    type: "create player",
    name
  }

const updateName = (id: number, name: string) =>
  <const>{
    type: "update name",
    id,
    name
  }

const addPoints = (id: number, points: number) =>
  <const>{
    type: "add points",
    id,
    points
  }

const like = (id: number) =>
  <const>{
    type: "like",
    id
  }

const dislike = (id: number) =>
  <const>{
    type: "dislike",
    id
  }

// Action

type Action = ReturnType<
  | typeof createPlayer
  | typeof updateName
  | typeof addPoints
  | typeof like
  | typeof dislike
>

// Reducer

// IIEEEK!
const reducer_ = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "update name":
      state.players[action.id].name = action.name
      return { ...state }
    case "add points":
      return { ...state, points: state.points + action.points }
    case "like":
      return { ...state, liked: true }
    case "dislike":
      return { ...state, liked: false }
  }

  return state
}

// Ahhh
const reducer = (state: State, action: Action): State =>
  produce(state, draft => {
    switch (action.type) {
      case "create player":
        draft.players.push(<Player>{ name: action.name, liked: false, points: 0 })
        break
      case "update name":
        draft.players[action.id].name = action.name
        break
      case "add points":
        draft.players[action.id].points += action.points
        break
      case "like":
        draft.players[action.id].liked = true
        break
      case "dislike":
        draft.players[action.id].liked = false
        break
    }
  })

// Example

const whatever = thread(initialState)(
  state => reducer(state, { type: "create player", name: "elf" }),
  state => {
    console.log(state)
    return state
  },
  state => reducer(state, { type: "like", id: 0 }),
  state => reducer(state, { type: "update name", id: 0, name: "troll" }),
  state => reducer(state, { type: "add points", id: 0, points: 77 }),
  state => reducer(state, addPoints(0, 256))
)

whatever

const actionCreatorNotPresentInTheType = (malicious: string) =>
  <const>{
    type: "NON_PRESENT",
    malicious
  }

const whatnot = thread(whatever)(
  state => reducer(state, { type: "NON_EXISTENT" }),
  state => reducer(state, actionCreatorNotPresentInTheType("just trolling"))
)

whatnot
