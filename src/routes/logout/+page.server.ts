import { api } from "$api/client.js"
import { handle_tokens } from '$api/handle_session.js'
import { clear_cookies } from "$api/cookies.js"
import { invalidateAll } from '$app/navigation'
import { redirect } from "@sveltejs/kit"
import { DIRECTUS_URL } from "$env/static/private"

export const load = async ({ cookies }) => {

    // do the token stuff, need to put a new token into the API
    // so it knows what session to kill... right? 
    const access_token = await handle_tokens(cookies)

    if (!access_token) throw redirect(307, "/login")

    const refresh_token = cookies.get("refresh_token")!

    // kill the session in Directus
    try {
        await fetch(`${DIRECTUS_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                refresh_token
            })
        })
        clear_cookies(cookies)
        return {
            success: true
        }
    } catch (err) {
        console.log("Error trying to logout")
        console.error(err)
    }
}