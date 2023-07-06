import type { LayoutServerLoad } from './$types.js'
import { get_user } from '$api/users.js'


export const load = (async ({ locals, depends, url }) => {

    depends("session")
    // if the welcome flag isn't on the url, get the user data
    // this prevents a double request to our backend on login
    if (!url.searchParams.has("welcome") && locals.access_token) {
        const { user } = await get_user(locals.access_token)
        return {
            user
        }
    }
    return {
        authorization: locals.authorization
    }
}) satisfies LayoutServerLoad