/* Simple tagged-union aka sum-type aka (wrongly but lovingly) union-types */
interface Loading {
  state: "loading"
}

interface Loaded {
  state: "loaded"
  data: string
}

interface Error {
  state: "error"
  message: string
}

type FetchState = Loading | Loaded | Error

let fetching = <FetchState>{ state: "loading" }
