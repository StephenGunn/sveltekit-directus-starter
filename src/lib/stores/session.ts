import { derived, writable, type Writable } from "svelte/store"
import { roles } from "$api/roles.js"

export const session: Writable<User> = writable({})

// return a string based on session role
export const authorization = derived(session, ($session) => {
    if(!$session.role) return "public"
    if ($session.role in roles) return roles[$session.role]
    else return "public"
})