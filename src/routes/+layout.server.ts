import { reset_sdk } from '$api/client.js'
import { handle_tokens } from '$api/handle_tokens.js'
import { get_user } from '$api/get_user.js'
import { get_user_role } from '$api/roles.js'
import type { LayoutServerLoad } from './$types.js'
import type { Role } from '$api/roles.js'

export const load = (async ({ cookies, depends }) => {

    // use depends to trigger invalidate on actions like logout
    depends('app:session')

    // if we have auth tokens, reauthorize.
    const handled = await handle_tokens(cookies)

    // if we can't handle the tokens (don't exist, can't refresh, etc)
    if (!handled) return {
        authorization: "public" as Role
    }

    // bootstrapped get user function
    const { user } = await get_user(cookies)

    // double  check for no user
    if (!user) return {
        authorization: "public" as Role
    }
    
    const authorization = await get_user_role(user)

    // make the API forget
    reset_sdk()

    return {
        user,
        authorization
    }
}) satisfies LayoutServerLoad