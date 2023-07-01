import { reset_sdk } from '$api/client.js'
import { handle_tokens } from '$api/handle_tokens.js'
import { get_user } from '$api/get_user.js'
import { get_user_role } from '$api/roles.js'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.js'

export const load = (async ({ cookies }) => {
    // if we have auth tokens, reauthorize.
    const handled = await handle_tokens(cookies)

    // if we can't handle the tokens (don't exist, can't refresh, etc)
    if(!handled) return {}

    // bootstrapped get user function
    const { user } = await get_user(cookies)

    // check for no user
    if (!user) return {}
    
    const authorization = await get_user_role(user)

    // make the API forget
    reset_sdk()

    if (authorization === "public") throw redirect(307, "/login")

    return {
        user,
        authorization
    }
}) satisfies LayoutServerLoad