import { api } from "$api/client.js"
import { clear_cookies } from "$api/cookies.js"
import { invalidateAll } from '$app/navigation'
import { redirect } from "@sveltejs/kit"
import { DIRECTUS_URL } from "$env/static/private"

export const load = async ({ locals, cookies }) => {

    // if we don't have an refresh token, leave
    if (!locals.refresh_token) throw redirect(307, "/login")

    // kill the session in Directus
    try {
        await fetch(`${DIRECTUS_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                refresh_token: locals.refresh_token
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