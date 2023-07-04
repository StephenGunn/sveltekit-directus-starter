import { auth } from "$api/client.js"
import { handle_tokens } from '$api/handle_tokens.js'
import { invalidateAll } from '$app/navigation'
import { redirect } from "@sveltejs/kit"

export const load = async ({ cookies }) => {
    // check for auth cookie before anything
    if (!cookies.get('auth')) throw redirect(307, "/login")

    // do the token stuff, need to put a new token into the API
    // so it knows what session to kill... right? 
    await handle_tokens(cookies)

    // kill the session in Directus
    try {
        //TODO: this works but errors
        await auth.logout()
    } catch (err) {
        console.log("Error trying to logout")
        console.error(err)
    }

    // delete the auth cookie
    cookies.set('auth', "", {
        maxAge: 0
    })

    return {
        success: true
    }
}