import { api, auth, reset_sdk } from '$api/client.js'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.js'
import { handle_tokens } from '$api/handle_tokens.js'

export const load = (async ({ cookies }) => {
    // do the token stuff
    const authenticated = await handle_tokens(cookies)

    // refreshed will return false if any cookie refreshing
    // logic fails, which means the user isn't authenticated
    // it's an easy way to check
    if (!authenticated) throw redirect(307, '/login')
    
    

    // make the API forget
    reset_sdk()
    
    return {
        success: true
    }
}) satisfies LayoutServerLoad