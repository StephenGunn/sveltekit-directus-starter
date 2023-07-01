import { redirect } from '@sveltejs/kit'
import { auth } from "$api/client.js"
import { handle_tokens } from '$api/handle_tokens.js'

export const load = async ({ cookies }) => {
    // do the token stuff, need to put a new token into the API
    // so it knows what session to kill... right? 
    await handle_tokens(cookies)

    // kill the session in Directus
    try {
        await auth.logout()
    } catch (err) {
        console.log("Error trying to logout")
        console.error(err)
    }

    // delete the auth cookie
    cookies.set('auth', "", {
        maxAge: 0
    })

    // redirect to the thanks page
    throw redirect(307, "/thanks")
}