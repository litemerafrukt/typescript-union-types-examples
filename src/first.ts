/* Action creators, reducer and types Quokka demo */
import { thread } from "./utils"

// State

const initialState = {
  name: "",
  points: 0,
  liked: false
}

type State = Readonly<typeof initialState>

// Action creators

const updateName = (name: string) =>
  <const>{
    type: "UPDATE_NAME",
    name
  }

const funkyName = (name: string) => {
  let funkyName = name === "abc" ? name.length : name

  return <const>{
    type: "FUNKY_NAME",
    funkyName
  }
}

const addPoints = (points: number) =>
  <const>{
    type: "ADD_POINTS",
    points
  }

const like = () =>
  <const>{
    type: "LIKE"
  }

const dislike = () =>
  <const>{
    type: "DISLIKE"
  }

// Actions

type Action = ReturnType<
  typeof updateName | typeof addPoints | typeof like | typeof dislike
>

// Reducer

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { ...state, name: action.name }
    case "ADD_POINTS":
      return { ...state, points: state.points + action.points }
    case "LIKE":
      return { ...state, liked: true }
    case "DISLIKE":
      return { ...state, liked: false }
  }

  return state
}

// Example

const whatever = thread(initialState)(
  state => reducer(state, { type: "LIKE" }),
  state => reducer(state, { type: "UPDATE_NAME", name: "troll" }),
  state => reducer(state, { type: "ADD_POINTS", points: 77 }),
  state => reducer(state, addPoints(256))
)

whatever

const anActionCreatorNotPresentInTheType = (malicious: string) =>
  <const>{
    type: "NON_PRESENT",
    malicious
  }

const whatnot = thread(whatever)(
  state => reducer(state, { type: "NON_EXISTENT" }),
  state => reducer(state, anActionCreatorNotPresentInTheType("just trolling"))
)

whatnot
