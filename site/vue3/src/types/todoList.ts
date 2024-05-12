export type TYPE_UNDO= 'undo'
export type TYPE_DONE = 'done'
export type TYPE_UNDO_DONE= TYPE_DONE | TYPE_UNDO
export type TYPE_CONTENT = string
export type TYPE_INPUT = boolean

export interface INF_LIST_ITEM {
  content: TYPE_CONTENT
  input: TYPE_INPUT
}

export type TYPE_LIST = Array<INF_LIST_ITEM>

export const undo:TYPE_UNDO = 'undo'
export const done:TYPE_DONE = 'done'

