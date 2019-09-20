import { deleteAt, map, mapWithIndex, reduceWithIndex, isEmpty } from "fp-ts/lib/Record"
import { flow, not, tuple } from "fp-ts/lib/function"

const o = { firstName: "Foo", lastName: "Bar" }

const allUpper = map((s: string) => s.toUpperCase())

allUpper(o) // ?

const keyAsValue = mapWithIndex(key => key)

keyAsValue(o) // ?

const swapKeyValue = reduceWithIndex({}, (key, acc, value: string) => ({
  ...acc,
  [value.toLowerCase()]: key
}))

swapKeyValue(o) // ?

deleteAt("firstName")(o) // ?

const deleteFirstName = deleteAt("firstName")
const deleteLastName = deleteAt("lastName")
const deleteName = flow(
  deleteFirstName,
  deleteLastName
)

isEmpty(o) // ?
const isNotEmpty = not(isEmpty)
isNotEmpty(o) // ?

const isEmptyWithoutName = flow(
  deleteName,
  isEmpty
)

isEmptyWithoutName(o) // ?

import { singleton, getMonoid } from "fp-ts/lib/Map"
import { eqString } from "fp-ts/lib/Eq"
import { semigroupSum } from "fp-ts/lib/Semigroup"

const meaningOfEverything = singleton("fortyTwo", 42)

meaningOfEverything.has("whatnot") // ?

const leet = new Map([["tretton37", 1337]])

const monoidLeetMap = getMonoid(eqString, semigroupSum)

monoidLeetMap.empty // ?
monoidLeetMap.concat(meaningOfEverything, leet) // ?
monoidLeetMap.concat(monoidLeetMap.empty, leet) // ?
