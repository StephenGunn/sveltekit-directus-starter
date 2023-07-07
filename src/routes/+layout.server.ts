import type { LayoutServerLoad } from './$types.js'

export const load = (async ({ locals, depends }) => {

    // invalidation target
    depends("session")

    // if the welcome flag isn't on the url, get the user data
    // this prevents a double request to our backend on login
    if (locals.user) {
        return {
            user: locals.user
        }
    }
}) satisfies LayoutServerLoad