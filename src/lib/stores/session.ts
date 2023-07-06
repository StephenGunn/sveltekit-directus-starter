import { writable, type Writable } from "svelte/store"
import type { Role } from "$api/roles.js"

// stores to control the UI
export const session: Writable<User> = writable({})
export const authorization: Writable<Role> = writable("public")

